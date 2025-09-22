
  <script>
  // Logo -> Voltar ao topo
  const logo = document.getElementById('logo');
  logo.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // === CALENDÁRIO INTERATIVO ===
  (function(){
    const monthYear = document.getElementById("monthYear");
    const calendarBody = document.getElementById("calendarBody");
    const prevBtn = document.getElementById("prevMonth");
    const nextBtn = document.getElementById("nextMonth");
    const eventDetails = document.getElementById("eventDetails");

    let today = new Date();
    let currentDate = new Date(today.getFullYear(), today.getMonth());

    const events = {
      "2025-03-10": "Início do Ano Letivo",
      "2025-06-15": "Festa Junina",
      "2025-12-20": "Encerramento do Ano",
      "2025-12-20": "Encerramento do Ano",
      "2025-12-20": "Encerramento do Ano",
      "2025-12-20": "Encerramento do Ano",
      "2025-12-20": "Encerramento do Ano",
      "2025-12-20": "Encerramento do Ano",
      "2025-12-20": "Encerramento do Ano",
      "2025-12-20": "Encerramento do Ano",
      "2025-12-20": "Encerramento do Ano",
    };

    function renderCalendar(date){
      const year = date.getFullYear();
      const month = date.getMonth();
      const firstDay = new Date(year, month, 1).getDay();
      const lastDate = new Date(year, month+1, 0).getDate();
      const monthNames = ["Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"];

      monthYear.innerText = `${monthNames[month]} ${year}`;
      calendarBody.innerHTML = "";
      let row = document.createElement("tr");

      for(let i=0; i<firstDay; i++){
        row.appendChild(document.createElement("td"));
      }

      for(let day=1; day<=lastDate; day++){
        const cell = document.createElement("td");
        const dateStr = `${year}-${String(month+1).padStart(2,"0")}-${String(day).padStart(2,"0")}`;
        cell.innerText = day;

        if(events[dateStr]){
          cell.classList.add("event-day");
          cell.addEventListener("click", ()=>{
            eventDetails.innerHTML = `<h4>📌 Evento em ${day}/${month+1}/${year}</h4><p>${events[dateStr]}</p>`;
          });
        }

        if(day === today.getDate() && month === today.getMonth() && year === today.getFullYear()){
          cell.classList.add("today");
        }

        row.appendChild(cell);
        if((firstDay+day) % 7 === 0){
          calendarBody.appendChild(row);
          row = document.createElement("tr");
        }
      }
      if(row.children.length){
        calendarBody.appendChild(row);
      }
    }

    prevBtn.addEventListener("click", ()=>{
      currentDate.setMonth(currentDate.getMonth()-1);
      renderCalendar(currentDate);
    });

    nextBtn.addEventListener("click", ()=>{
      currentDate.setMonth(currentDate.getMonth()+1);
      renderCalendar(currentDate);
    });

    renderCalendar(currentDate);
  })();

  // Carrossel
  let currentIndex = 0;
  const slides = document.querySelector(".carousel-slide");
  const totalSlides = slides.children.length;

  function showNextSlide() {
    currentIndex = (currentIndex + 1) % totalSlides;
    slides.style.transform = `translateX(${-currentIndex * 100}%)`;
  }

  setInterval(showNextSlide, 4000);
    // Espera o documento HTML ser completamente carregado para o blog
    document.addEventListener('DOMContentLoaded', () => {
        const form = document.getElementById('post-form');
        const postsContainer = document.getElementById('posts-container');
       
        // Carrega os posts salvos no localStorage
        renderPosts();

        // Adiciona um evento para o formulário
        form.addEventListener('submit', (event) => {
            event.preventDefault(); // Impede o recarregamento da página

            const title = document.getElementById('post-title').value;
            const content = document.getElementById('post-content').value;
           
            const newPost = {
                title: title,
                content: content,
                date: new Date().toLocaleDateString('pt-BR')
            };

            savePost(newPost);
            renderPosts();
            form.reset();
        });

        function loadPosts() {
            const posts = JSON.parse(localStorage.getItem('blogPosts')) || [];
            return posts;
        }

        function savePost(post) {
            const posts = loadPosts();
            posts.unshift(post);
            localStorage.setItem('blogPosts', JSON.stringify(posts));
        }

        // Função renderPosts atualizada com o botão de exclusão
        function renderPosts() {
            const posts = loadPosts();
            postsContainer.innerHTML = '';

            posts.forEach((post, index) => {
                const postElement = document.createElement('article');
                postElement.classList.add('post');
               
                postElement.innerHTML = `
                    <h2 class="post-title">${post.title}</h2>
                    <p class="post-meta">Publicado em ${post.date}</p>
                    <p class="post-content">${post.content}</p>
                    <div class="post-actions">
                        <button class="delete-button" data-index="${index}">Excluir</button>
                    </div>
                `;
               
                postsContainer.appendChild(postElement);
            });
        }
       
        function deletePost(index) {
            const posts = loadPosts();
            posts.splice(index, 1);
            localStorage.setItem('blogPosts', JSON.stringify(posts));
            renderPosts();
        }

        postsContainer.addEventListener('click', (event) => {
            if (event.target.classList.contains('delete-button')) {
                const index = event.target.getAttribute('data-index');
                if (confirm('Tem certeza que deseja excluir esta publicação?')) {
                    deletePost(index);
                }
            }
        });
    });
</script>