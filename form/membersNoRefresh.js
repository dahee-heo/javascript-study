const url = new URL(window.location);
const queryString = url.searchParams;
const nameText = queryString.get('input-text');
const inputHiddens = queryString.getAll('input-hidden');
const inputHidden = inputHiddens[0];

// const inputTextObjects = document.getElementsByName('input-text');
// const inputTextObject = inputTextObjects[0];

const inputTextObject = document.getElementsByName('input-text')[0];


inputTextObject.value = nameText;

inputTextObject.focus();
inputTextObject.blur();

// const members = [];
const membersGet = sessionStorage.getItem('members');
const membersLogical = membersGet || '[]';
const members = JSON.parse(membersLogical);

const membersSet = function(){
  const membersSet = JSON.stringify(members);
  sessionStorage.setItem('members', membersSet);
};
const membersCreate = function(member) {
  members.push(member);
  membersSet();
  return members;
};

const membersRead = function() {
  const tagPre = document.getElementById('tag-pre');
  tagPre.innerHTML = '';
  for (let index in members) {
    tagPre.innerHTML += '<input type="text" name="members-name" value="' + members[index] + '">';
    tagPre.innerHTML += '<button onclick="membersDelete(' + index + ')">Delete</button>';
    tagPre.innerHTML += '\n';
  }
  console.log('Readed', members);


  return members;
};

const membersDelete = function(index) {
  members.splice(index, 1);
  membersSet();
 
  return members;
};

const membersUpdate = function(index, member) {
  members[index] = member;
  membersSet();
  return members;
};

const membersSubmit = function(f) {
  const inputTextObject = f['input-text'];
  // inputTextObject.value = 'abcd'
  try {
    const evalReturn = eval(inputTextObject.value);
    console.log(evalReturn);
  } catch(error) {
    console.error(error);
    alert(error);
    return false;
  }
}


membersRead();
