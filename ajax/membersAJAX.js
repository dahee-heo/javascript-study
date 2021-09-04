const membersGet = sessionStorage.getItem('members');
const membersLogical = membersGet || '[]';
const members = JSON.parse(membersLogical);

const ajax = function(method, url, data, callback){
  const xhrObject = new XMLHttpRequest();
  xhrObject.onreadystatechange = function() {
    if (xhrObject.readyState !== 4) return;
    if (xhrObject.status === 200) {
      callback(xhrObject);
    } else {
      const error = {
        status: xhrObject.status,
        statusText: xhrObject.statusText,
        responseText: xhrObject.responseText
      }
      console.error(error);
    }
  };
  xhrObject.open(method, url);
  xhrObject.setRequestHeader('Content-Type', 'application/json');
  xhrObject.send(JSON.stringify(data));
};

const membersCreate = function(form) {
  const memberNameObject = form['member-name'];
  const memberAgeObject = form['member-age'];
  const member = {
    name: memberNameObject.value,
    age: memberAgeObject.value
  };
  // ajax('POST', 'http://localhost:3100/api/v1/members', member, successFunction);
  axios.post('http://localhost:3100/api/v1/members', member)
  .then(function(reponse) {
    memberNameObject.value = '';
    memberAgeObject.value = '';
    membersRead();
  })
  .catch(function (error) {
    console.log(error);
  });

};


const membersRead = function() {
  const successFunction = function(reponse) {
    // const membersLogical = JSON.parse(xhrObject.responseText);
    const members = reponse.data.members;
    const tagDivParent = document.getElementById('tag-div-parent');
    const tagDivChild = document.getElementById('tag-div-child');
    tagDivParent.innerHTML = '';
    for (let index in members) {
      const newDivChild = tagDivChild.cloneNode(true);
      tagDivParent.appendChild(newDivChild);
      const membersNameObject = document.getElementsByName('members-name')[index];
      const membersAgeObject = document.getElementsByName('members-age')[index];
      const membersUpdateObject = document.getElementsByName('members-update')[index];
      const membersDeleteObject = document.getElementsByName('members-delete')[index];
      membersNameObject.value = members[index].name;
      membersAgeObject.value = members[index].age;
      membersUpdateObject.index = index;
      membersDeleteObject.index = index;
    }
    console.log('Readed', members);
  };


  // ajax('GET','http://localhost:3100/api/v1/members', undefined, successFunction);
  axios.get('http://localhost:3100/api/v1/members')
  .then(successFunction)
  .catch(function (error) {
    // handle error
    console.log(error);
  });
};


const membersDelete = function(index) {
  const url = 'http://localhost:3100/api/v1/members/' + index;

  // ajax('DELETE', url, undefined, membersRead);
  axios.delete(url)
  .then(membersRead)
  .catch(function (error) {
    // handle error
    console.log(error);
  });
};


const membersUpdate = function(index) {
  const url = 'http://localhost:3100/api/v1/members/' + index;
  const name = document.getElementsByName('members-name')[index].value;
  const age = document.getElementsByName('members-age')[index].value;
  const member = {
    name: name,
    age: age
  }

  // ajax('PATCH', url, member, membersRead)
  axios.patch(url, member)
  .then(membersRead)
  .catch(function (error) {
    console.log(error);
  });
};


const membersSet = function() {
  const membersSet = JSON.stringify(members);
  sessionStorage.setItem('members', membersSet);
};

membersRead();