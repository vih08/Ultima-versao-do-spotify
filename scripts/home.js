document.getElementById('registerId').addEventListener('click', addMusic);

let musicList = JSON.parse(localStorage.getItem('musicList')) || [];

function addMusic() {
    const title = document.getElementById('titleInput').value;
    const artist = document.getElementById('artistInput').value;
    const genre = document.getElementById('genderInput').value;
    const duration = document.getElementById('durationInput').value;
    const musicInput = document.getElementById('musicInput').files[0];

    if (!title || !artist || !genre || !duration || !musicInput) {
        alert('Todos os campos devem ser preenchidos!');
        return;
    }

    const musicEntry = {
        title,
        artist,
        genre,
        duration,
        musicLink: URL.createObjectURL(musicInput) 
    };

    musicList.push(musicEntry);
    localStorage.setItem('musicList', JSON.stringify(musicList));
    
    alert('Música cadastrada com sucesso!');
    renderPlaylists(); 

    clearInputFields();
}

function clearInputFields() {
    document.getElementById('titleInput').value = '';
    document.getElementById('artistInput').value = '';
    document.getElementById('genderInput').value = '';
    document.getElementById('durationInput').value = '';
    document.getElementById('musicInput').value = ''; 
}

function renderPlaylists() {
    const playlistsContainer = document.querySelector('.playlists-container');
    playlistsContainer.innerHTML = '';

    musicList.forEach((music, index) => {
        const playlistDiv = document.createElement('div');
        playlistDiv.className = 'playlist';

        const playlistInfoDiv = document.createElement('div');
        playlistInfoDiv.className = 'playlist-info';

        const titleElem = document.createElement('p');
        titleElem.className = 'playlist-title';
        titleElem.textContent = music.title;

        const descriptionElem = document.createElement('p');
        descriptionElem.className = 'playlist-description';
        descriptionElem.textContent = `Artista: ${music.artist}, Gênero: ${music.genre}, Duração: ${music.duration}`;

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Deletar';
        deleteButton.className = 'delete-button';
        deleteButton.addEventListener('click', (event) => {
            event.stopPropagation();
            deleteMusic(index);
        });

        const playButton = document.createElement('button');
        playButton.textContent = 'Reproduzir';
        playButton.className = 'play-button';
        playButton.addEventListener('click', () => {
            const audioPlayer = document.getElementById('audioPlayer');
            audioPlayer.src = music.musicLink;  
            audioPlayer.style.display = 'block'; 
            audioPlayer.play();
        });

        playlistInfoDiv.appendChild(titleElem);
        playlistInfoDiv.appendChild(descriptionElem);
        playlistInfoDiv.appendChild(deleteButton);
        playlistInfoDiv.appendChild(playButton);

        playlistDiv.appendChild(playlistInfoDiv);
        playlistsContainer.appendChild(playlistDiv);
    });
}

function deleteMusic(index) {
    musicList.splice(index, 1);
    localStorage.setItem('musicList', JSON.stringify(musicList));
    renderPlaylists();
}

function searchItems() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const items = document.querySelectorAll('.item');
    
    items.forEach(item => {
        const itemText = item.textContent.toLowerCase();
        
        if (itemText.includes(searchTerm)) {
            item.classList.remove('hidden');
        } else {
            item.classList.add('hidden');
        }
    });
}

document.getElementById('searchButton').addEventListener('click', searchItems);

document.getElementById('searchInput').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        searchItems(); //não funciona essa parte e tem que arrumar o tamanho do player
    }
});
renderPlaylists();
