const userAction = async () => {
  const response = await fetch('https://api.npoint.io/20c1afef1661881ddc9c');
  const myJson = await response.json(); //extract JSON from the http response
}
userAction();