#!/bin/bash


# Remove all existing files in /var/www/html/
echo "Removing existing files in /var/www/html/..."
sudo rm -rf /var/www/html/*


# Extract the release archive to /var/www/html/
echo "Extracting release archive..."
#sudo tar xfpv ../relase.txz -C /var/www/html/
sudo tar xfpv /home/ubuntu/release.txz -C /var/www/html/ --strip-components=1


# Change ownership of /var/www/html/
echo "Changing ownership of /var/www/html/..."
sudo chown -R www-data:www-data /var/www/html/
