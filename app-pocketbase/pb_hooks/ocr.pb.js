onRecordAfterCreateSuccess((e) => {
  $app.logger().info(`attempting to parse text from post '${e.record.id}'`,
    "source", "ocr.pb.js"
  );
  const imageName = e.record.baseFilesPath() + "/" + e.record.get("image");

  let fsys;
  try {
    fsys = $app.newFilesystem();
    const file = fsys.getReuploadableFile(imageName, true);

    const formData = new FormData();
    formData.append("image", file);

    const res = $http.send({
      url:     `${process.env.PRIVATE_OCR_URL}/ocr`,
      method:  "POST",
      body:    formData,
      timeout: 120
    });

    e.record.set('ocr_text', res?.json?.content || "");
    $app.save(e.record);
    $app.logger().info(`OCR response for post '${e.record.id}': '${JSON.stringify(res?.json)}'`,
      "source", "ocr.pb.js"
    );
  } catch(e) {
    $app.logger().error(`Failed to perform OCR; got '${e.message}'`,
      "source", "ocr.pb.js"
    );
  } finally {
    fsys?.close();
  }

  e.next();
}, "posts");