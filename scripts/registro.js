function cadastrarUsuario(){
   
    let name = document.getElementById('name').value
    let email = document.getElementById('email').value
    let confirmEmail = document.getElementById('confirm-email').value
    let password = document.getElementById('password').value
    let confirmPassword = document.getElementById('confirm-password').value
    let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [] 

    if(email !== confirmEmail){
        document.getElementById('mensagem').innerText = 'Emails estão diferentes'
        return
    }
    if(password !== confirmPassword){
        document.getElementById('mensagem').innerText = 'Senhas estão diferentes'
        return
    }

    let usuarioExistente = usuarios.find(usuario => usuario.email === email)
    if(usuarioExistente){
        document.getElementById('mensagem').innerText = 'E-mail já cadastrado'
        return
    }

    let novoUsuario = {
        id: Date.now(),
        nome: name,
        email: email,
        senha: btoa(password), 
        playlists: []
    }

    usuarios.push(novoUsuario)

    localStorage.setItem('usuarios', JSON.stringify(usuarios))
    document.getElementById('mensagem').innerText = 'Usuario foi cadastrado'

    setTimeout(() => {
        window.location.href = 'index.html'
    },4000)
}

function voltar(){
    window.location.href = '../index.html'
}
