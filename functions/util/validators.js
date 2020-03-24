const isEmpty = data => {
  if (data.trim() === "") return true;
  else return false;
};
const isEmail = email => {
  const regEx = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (email.match(regEx)) return true;
  else return false;
};

exports.validateSignupData = data => {
  let errors = {};

  if (isEmpty(data.email)) {
    errors.email = "Email adresi boş olamaz!";
  } else if (!isEmail(data.email)) {
    errors.email = "Geçerli bir email girişi yapınız.";
  }

  if (isEmpty(data.password)) errors.password = "Lütfen parola giriniz!";
  if (data.password !== data.confirmPassword)
    errors.password = "Parolalar uyumsuz!";
  if (isEmpty(data.handle)) errors.handle = "Boş bırakılamaz.";

  return {
    errors,
    valid: Object.keys(errors).length === 0 ? true : false
  };
};

exports.validateLoginData = data => {
  let errors = {};

  if (isEmpty(data.email)) {
    errors.email = "Lütfen boş bırakmayınız!";
  } else if (!isEmail(data.email)) {
    errors.email = "Geçerli bir email girişi yapınız.";
  }
  if (isEmpty(data.password)) errors.password = "Lütfen boş bırakmayınız!";

  return {
    errors,
    valid: Object.keys(errors).length === 0 ? true : false
  };
};

exports.reduceUserDetails = data => {
  let userDetails = {};

  if (!isEmpty(data.bio.trim())) userDetails.bio = data.bio;
  if (!isEmpty(data.website.trim())) {
    if (data.website.trim().substring(0, 4) !== "http") {
      userDetails.website = "http://" + data.website.trim();
    } else userDetails.website = data.website;
  }
  if (!isEmpty(data.location.trim())) userDetails.location = data.location;

  return userDetails;
};
