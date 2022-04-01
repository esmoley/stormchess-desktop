console.log("hello from renderer process")
/*const {getLink} = (require('electron') as any).remote.require('./main.js');
alert(getLink());*/
//(document as any).querySelector('#data').value = getLink();
document.getElementById('open-in-browser').addEventListener('click', () => {
  shell.open();
});