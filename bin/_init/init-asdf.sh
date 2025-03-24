#!/bin/bash
git clone https://github.com/asdf-vm/asdf.git ~/.asdf --branch v0.14.1

echo 'source "$HOME/.asdf/asdf.sh"' >> ~/.bashrc
echo 'source "$HOME/.asdf/completions/asdf.bash"' >> ~/.bashrc
