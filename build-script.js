var fs = require('fs');

fs.writeFile('.\\out\\appsettings.generated.json', JSON.stringify({
    environment : process.env.DEV?"development":"production",
}), function (err) {
  if (err) throw err;
  console.log('appsettings.generated.json was created');
});