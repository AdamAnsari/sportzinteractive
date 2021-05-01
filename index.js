const userAction = async () => {
  const response = await fetch('https://api.npoint.io/20c1afef1661881ddc9c');
  const myJson = await response.json(); //extract JSON from the http response
  console.log(myJson);

  var playerListArr = [];
  var playerListObj = {};
  
  myJson.playerList.forEach((element, index) => {
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
  console.log(playerListArr);
}
userAction();