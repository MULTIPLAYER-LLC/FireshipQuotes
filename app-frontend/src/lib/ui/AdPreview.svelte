<script lang="ts">
  const ads = [
    'https://static.demilked.com/wp-content/uploads/2022/12/pranko-funny-ads-1.jpg',
    'https://static.demilked.com/wp-content/uploads/2022/12/pranko-funny-ads-2.jpg',
    'https://static.demilked.com/wp-content/uploads/2022/12/pranko-funny-ads-3.jpg',
    'https://static.demilked.com/wp-content/uploads/2022/12/pranko-funny-ads-4.jpg',
    'https://static.demilked.com/wp-content/uploads/2022/12/pranko-funny-ads-5.jpg',
    'https://static.demilked.com/wp-content/uploads/2022/12/pranko-funny-ads-6.jpg',
    'https://static.demilked.com/wp-content/uploads/2022/12/pranko-funny-ads-7.jpg',
    'https://static.demilked.com/wp-content/uploads/2022/12/pranko-funny-ads-8.jpg',
    'https://static.demilked.com/wp-content/uploads/2022/12/pranko-funny-ads-9.jpg',
    'https://static.demilked.com/wp-content/uploads/2022/12/pranko-funny-ads-10.jpg',
    'https://static.demilked.com/wp-content/uploads/2022/12/pranko-funny-ads-11.jpg',
    'https://static.demilked.com/wp-content/uploads/2022/12/pranko-funny-ads-12.jpg',
    'https://static.demilked.com/wp-content/uploads/2022/12/pranko-funny-ads-13.jpg',
    'https://static.demilked.com/wp-content/uploads/2022/12/pranko-funny-ads-14.jpg',
    'https://static.demilked.com/wp-content/uploads/2022/12/pranko-funny-ads-15.jpg',
    'https://static.demilked.com/wp-content/uploads/2022/12/pranko-funny-ads-16.jpg',
    'https://static.demilked.com/wp-content/uploads/2022/12/pranko-funny-ads-17.jpg',
    'https://static.demilked.com/wp-content/uploads/2022/12/pranko-funny-ads-18.jpg',
    'https://static.demilked.com/wp-content/uploads/2022/12/pranko-funny-ads-19.jpg',
    'https://static.demilked.com/wp-content/uploads/2022/12/pranko-funny-ads-20.jpg'
  ]
</script>

<div class="h-auto w-full">
  <a href="https://shattereddisk.github.io/rickroll/rickroll.mp4" class="row-span-5 col-start-2 row-start-2 w-full h-full block">
    Advertisement
    <img src={ads[Math.floor(Math.random() * ads.length)]} alt="funny ad" class="h-auto w-full" />
  </a>
</div>
