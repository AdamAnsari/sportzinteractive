var playerListArr = [];
var playerListObj = {};

const userAction = async () => {
  const response = await fetch('https://api.npoint.io/20c1afef1661881ddc9c');
  const myJson = await response.json(); //extract JSON from the http response
  console.log(myJson);
  myJson.playerList.forEach((element) => {
    playerListObj = {
      Id: element.Id,
      PFName: element.PFName,
      SkillDesc: element.SkillDesc,
      Value: element.Value,
      CCode: element.UpComingMatchesList[0].CCode,
      VsCCode: element.UpComingMatchesList[0].VsCCode,
      MDate: element.UpComingMatchesList[0].MDate
    }
    playerListArr.push(playerListObj);
    playerListObj = {}
  }); 

  this.playerListArr = this.playerListArr.sort((a, b) => (+a.Value < +b.Value ? -1 : 1));

  console.log(playerListArr); 
  displayCard(playerListArr);
}
userAction();

const displayCard = (data) => {
  var main = document.getElementById("card-container");
  var div = [];
  data.forEach((element, i) => {
    div.push(document.createElement("div"));
    div[i].setAttribute("class","card col-md-4 col-sm-4");
    const image = document.createElement("img");
    image.setAttribute("class","card-img-top");
    image.src = `assets/player-images/${element.Id}.jpg`;;
    div[i].appendChild(image);
    var innerDiv = document.createElement("div");
    innerDiv.setAttribute("class","card-body");
    var h3 = document.createElement("h3");
    h3.textContent = (element.PFName !== '') ? `Name: ${element.PFName}` : 'Name: Not Provided';
    var h4 = document.createElement("h4");
    h4.setAttribute("class","card-text");
    h4.textContent = (element.SkillDesc !== '') ? `Skill: ${element.SkillDesc}` : 'Skill: Not Provided';
    innerDiv.appendChild(h3);
    innerDiv.appendChild(h4);
    var h4 = document.createElement("h4");
    h4.setAttribute("class","card-text");
    h4.textContent = (element.Value !== '') ? `Value: $${element.Value}` : 'Value: Not Provided';
    innerDiv.appendChild(h4);
    var h4 = document.createElement("h4");
    h4.setAttribute("class","card-text");
    h4.textContent = (element.CCode !== '' || element.VsCCode !== '') ? `Upcoming Matches List: ${element.CCode} vs ${element.VsCCode}` : 'Upcoming Matches List: Not Provided';
    innerDiv.appendChild(h4);
    var p = document.createElement("p");
    p.setAttribute("class","card-text");
    p.textContent = (element.MDate !== '') ? 'Date: ' + new Date(element.MDate + ' UTC').toString() : 'Date: Not Provided';
    innerDiv.appendChild(p);
    div[i].appendChild(innerDiv);
    main.appendChild(div[i]);
  });
}

const search = (value) => {
  let newData =  playerListArr.filter(x => x.PFName.includes(value))

  if(newData.length) {
    var main = document.getElementById("card-container");
    main.innerHTML = "";
    displayCard(newData);
  } else {
    alert('No Result Found. Try Again')
    var main = document.getElementById("card-container");
    var input = document.getElementById("search");
    main.innerHTML = "";
    input.value = "";
    displayCard(playerListArr);
  }
}