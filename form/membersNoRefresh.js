const url = new URL(window.location);
const queryString = url.searchParams;
const nameText = queryString.get('input-text');
const inputHiddens = queryString.getAll('input-hidden');
const inputHidden = inputHiddens[0];

// const inputTextObjects = document.getElementsByName('input-text');
// const inputTextObject = inputTextObjects[0];

const inputTextObject = document.getElementsByName('input-text')[0];


// inputTextObject.value = nameText;

// inputTextObject.focus();
// inputTextObject.blur();

// const members = [];
const membersGet = sessionStorage.getItem('members');
const membersLogical = membersGet || '[]';
const members = JSON.parse(membersLogical);

const membersSet = function(){
  const membersSet = JSON.stringify(members);
  sessionStorage.setItem('members', membersSet);
};

const membersCreate = function(form) {
  const memberNameObject = form['member-name'];
  const memberAgeObject = form['member-age'];
  members.push({
    name: memberNameObject.value,
    age: memberAgeObject.value
  });
  memberNameObject.value = '';
  memberAgeObject.value = '';

  membersSet();
  return membersRead();
};


const membersRead = function() {
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
    // membersNameObject.value = members[index];
    membersNameObject.value = members[index].name;
    membersAgeObject.value = members[index].age;

    membersUpdateObject.index = index;
    membersDeleteObject.index = index;

  }
  console.log('Readed', members);
  return members;
};


const membersDelete = function(index) {
  members.splice(index, 1);
  membersSet();
 
  return membersRead();
};

const membersUpdate = function(index) {
  const name = document.getElementsByName('members-name')[index].value;
  const age = document.getElementsByName('members-age')[index].value;
  members[index] = {
    name: name,
    age: age
  };
  membersSet();
  return membersRead();
};


membersRead();
