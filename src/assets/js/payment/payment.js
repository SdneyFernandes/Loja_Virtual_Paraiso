document.addEventListener("DOMContentLoaded", function () {

    function validateCardNumber(cardNumber) {
        return /^\d{16}$/.test(cardNumber);
    }

    function validateEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    function validateTelefone(telefone) {
        return /^\(\d{2}\)\s\d{3}\s\d{3}\s\d{3}$/.test(telefone);
    }

    document.getElementById("comprarAgora").addEventListener("click", function (event) {
        event.preventDefault();

        var nacionalidade = document.querySelector('input[name="nacionalidade"]:checked').value;
        var name = document.getElementById("name").value;
        var email = document.getElementById("email").value;
        var telefone = document.getElementById("telefone").value;
        var cpfCnpj = document.getElementById("cpfCnpj").value;
        var numbercard = document.getElementById("numbercard").value;
        var nameImpresso = document.getElementById("nameImpresso").value;
        var validade = document.getElementById("validade").value;
        var cvv = document.getElementById("cvv").value;
        var parcelamento = document.getElementById("parcelamento").value;

        if (!name || !email || !telefone || !numbercard || !nameImpresso || !validade || !cvv || !parcelamento) {
            Swal.fire({
                icon: 'error',
                title: 'Erro',
                text: 'Por favor, preencha todos os campos.',
            });
        } else if (!validateEmail(email)) {
            Swal.fire({
                icon: 'error',
                title: 'Erro',
                text: 'Por favor, insira um e-mail válido.',
            });
        } else if (!validateTelefone(telefone)) {
            Swal.fire({
                icon: 'error',
                title: 'Erro',
                text: 'Por favor, insira um número de telefone válido.',
            });
        } else if (!validateCardNumber(numbercard)) {
            Swal.fire({
                icon: 'error',
                title: 'Erro',
                text: 'Por favor, insira um número de cartão válido.',
            });
        } else {
            Swal.fire({
                icon: 'success',
                title: 'Compra efetuada com sucesso!',
                showConfirmButton: false,
                timer: 2000,
                onClose: function () {
                    document.querySelector(".form").reset();
                }
            });
        }
    });
});
