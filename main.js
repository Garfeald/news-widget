
// const apiKey = '4dbc17e007ab436fb66416009dfb59a8';
// const apiKey = '7878eaa2b917400fbc0b81e516b55e6b';
const apiKey = '295c6b46f60d41d18d38545d6281f15f';
// const apiKey = '279ea6339b4c42cb99b8d3f02219d9d7';

const conteiner = document.getElementById('conteiner');

const buttonHideNews = document.getElementById('button-hide');

const messageCount= document.getElementsByClassName('messageCount')

const data = new Date();

const fixedDate = `${data.getDate()}.${data.getMonth() + 1}.${data.getFullYear()}`;



// !! функция вызова виджета по клику на иконку !! //

const showMessageWidget = () => {
  conteiner.classList.add('conteiner-active');
}

//////


// !! функция чтения непрочитанных сообщений !! //

const readMessage = (id, blockId) => {
    const statusText = document.getElementById(id)
    const textBlock = document.getElementById(blockId)
    statusText.classList.add('status__text-active');
    document.getElementById(id).innerHTML = 'Viewed'
    const messageCount = document.getElementById('messageCount').innerHTML
    document.getElementById('messageCount').innerHTML = messageCount - 1
    statusText.removeAttribute('onclick')
    textBlock.removeAttribute('onclick')
    if(messageCount - 1 === 0){
      document.getElementById('block-message').innerHTML = ''
      buttonHideNews.classList.add('button-hide_active')
    }
} 

//////


// !! функция запроса списка новостей !! //

function requestNews() {
  fetch(`https://newsapi.org/v1/articles?source=bbc-news&sortBy=top&apiKey=${apiKey}`, {
    mode: 'cors'
    }
  )
    .then((response) => {
      return response.json();
    })
    .then(renderContent);
}

//////


// !! функция рендера контента 'coiteiner' !! // 
  
const renderContent = (response) => {
  const { articles } = response;
  let conteinerContent = document.getElementById('conteiner').innerHTML
  let messageIconContent = document.getElementById('block-message').innerHTML
  articles.map((dataFields, index) => {
    conteinerContent += 
      ` 
        <div class="news-block">
          <div class="img-block">
            <img src="${dataFields.urlToImage}" class="img" />
          </div>
            <div id="${index + dataFields.author}" class="text-block" onclick="readMessage('${index}', '${index + dataFields.author}')">
              <p><b id="">Title:</b> ${dataFields.title}</p>
              <p><b>Author:</b> ${dataFields.author}</p>
              <div><b>Details: </b><a href="${dataFields.url}">ShowDetails</a></div>
              <p><b>Date:</b> ${fixedDate}</p>
              <div class="status">
              <b>Status:</b>
              <p id="${index}" class="status__text">Not Viewed!</p>
            </div>
          </div>
        </div>

      `;
      messageIconContent =
      `
        <div class="message" onclick="showMessageWidget()"><b class="messageCount" id="messageCount">${articles.length}</b></div>

      `
      document.getElementById('block-message').innerHTML = messageIconContent;
  })
  document.getElementById('conteiner').innerHTML = conteinerContent;
}

//////

requestNews();


const hideNews = () => {
  document.getElementById('conteiner').innerHTML = '';
  buttonHideNews.classList.remove('button-hide_active');
  conteiner.classList.remove('conteiner_active');
}

