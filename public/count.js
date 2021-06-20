window.onload = async () => {

let user = await fetch("https://node.autosql.co.kr/landing/user")
  .then(response => response.json())
  .catch(error => console.log('error', error));
document.getElementById('user-count').textContent = user.count;

let erd = await fetch("https://node.autosql.co.kr/landing/erd")
  .then(response => response.json())
  .catch(error => console.log('error', error));
document.getElementById('erd-count').textContent = erd.count;

let share = await fetch("https://node.autosql.co.kr/landing/share")
  .then(response => response.json())
  .catch(error => console.log('error', error));
document.getElementById('share-count').textContent = share.count;

}