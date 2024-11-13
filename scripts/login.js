
function login() {
    let email = document.getElementById('login-email').value;
    let password = document.getElementById('login-password').value;

    let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

    let usuario = usuarios.find(usuario => usuario.email === email && atob(usuario.senha) === password);

    
    if (usuario) {
       
        sessionStorage.setItem('usuarioLogado', JSON.stringify(usuario));
     
        window.location.href = './pages/home.html';
    } else {
        document.getElementById('mensagem').innerText = 'Email ou senha incorretos';
        return;
    }
    if(tocar){
        sessionStorage.setItem('musicaCadastrada', JSON.stringify(tocar));
    }
}

