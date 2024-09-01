const userName = document.querySelector("#username");
const password = document.querySelector("#password");
const rePassword = document.querySelector("#re-password");
const email = document.querySelector("#email");
const sendBtn = document.querySelector(".send");
const clearBtn = document.querySelector(".clear");
const popup = document.querySelector(".popup");

const showError = (input, msg) => {
  const formBox = input.parentElement;
  const errorMsg = formBox.querySelector(".error-text");

  formBox.classList.add("error");
  errorMsg.textContent = msg;
};

const clearError = (input) => {
  const formBox = input.parentElement;
  formBox.classList.remove("error");
};

const checkLength = (input, min) => {
  if (input.value.length < min) {
    showError(
      input,
      `${input.previousElementSibling.innerText.slice(
        0,
        -1
      )} musi mieć min ${min} znaków.`
    );
  }
};

const checkForm = (input) => {
  input.forEach((el) => {
    if (el.value === "") {
      showError(el, el.placeholder);
    } else {
      clearError(el);
    }
  });
};

const checkPass = (pass1, pass2) => {
  if (pass1.value !== pass2.value) {
    showError(pass2, "Hasła do siebie nie pasują.");
  }
};

const checkEmail = (email) => {
  const emailPattern =
    /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i;

  if (!emailPattern.test(email.value)) {
    showError(email, "Podaj poprawny adres e-mail.");
  } else {
    clearError(email);
  }
};

const checkErrors = () => {
  const allInputs = document.querySelectorAll(".form-box");
  let errorCount = 0;
  allInputs.forEach((el) => {
    if (el.classList.contains("error")) {
      errorCount++;
    }

    if (errorCount === 0) {
      popup.classList.add("show-popup");
    }
  });
};

sendBtn.addEventListener("click", (e) => {
  e.preventDefault();

  checkForm([userName, password, rePassword, email]);
  checkLength(userName, 3);
  checkLength(password, 8);
  checkPass(password, rePassword);
  checkEmail(email);
  checkErrors();
});

clearBtn.addEventListener("click", (e) => {
  e.preventDefault();
  [userName, password, rePassword, email].forEach((el) => {
    el.value = "";
    clearError(el);
  });
});
