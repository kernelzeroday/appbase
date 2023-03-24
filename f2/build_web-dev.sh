rm -vrf .expo/
rm -vrf dist/
npx expo export -p web --max-workers 7 --dev && tar pvJcf /tmp/release.txz dist/
echo "=====> WRITTEN TO: /tmp/release.txz <======"
