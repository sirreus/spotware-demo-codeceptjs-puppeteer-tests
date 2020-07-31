const { I } = inject();

module.exports = {
  url: "/",
  auth: {
    wrapper: "body>div.silentAuthDialog",
    iframe: "iframe#ctid-iframe",
    body: "body.white.locale-en",
    logo: "div.logo>img",
    form: "div.auth-form",
    login: {
      container: "div#login",
      email: '//input[@id="login-id"][@name="id"]',
      password: '//input[@name="password"]',
      button: '//button[text()="Log in"]',
    },
    signup: {
      container: "div#signup",
      email: '//input[@id="signup-id"][@name="email"]',
      password: '//input[@id="signup-password"][@name="password"]',
      confirm: '//input[@name="repeatPassword"]',
      button: '//button[text()="Sign up"]',
    },
    recaptcha: {
      container: "div#rc-anchor-container",
      checkbox: "span#recaptcha-anchor",
    },
  },

  pageShouldBePresent() {
    I.waitForVisible(this.auth.wrapper, 10);
    I.seeCssPropertiesOnElements(this.auth.wrapper, { display: "block" });
    I.waitForVisible(this.auth.iframe);
  },

  authFormShouldBePresent() {
    I.switchTo(this.auth.iframe);
    I.waitForVisible(this.auth.body, 10);
    I.waitForVisible(this.auth.logo);
    I.waitForVisible(this.auth.form);
    I.seeElementInDOM(this.auth.login.container);
    I.seeElementInDOM(this.auth.signup.container);
  },

  signupFormShouldBeVisible() {
    I.waitForVisible(this.auth.signup.container, 5);
    I.seeCssPropertiesOnElements(this.auth.signup.container, { display: "block" });
    I.seeElement(this.auth.signup.email);
    I.seeElement(this.auth.signup.password);
    I.seeElement(this.auth.signup.confirm);
    I.seeElement(this.auth.signup.button);
  },

  loginFormShouldBeVisible() {
    I.waitForVisible(this.auth.login.container, 5);
    I.seeCssPropertiesOnElements(this.auth.login.container, { display: "block" });
    I.seeElement(this.auth.login.email);
    I.seeElement(this.auth.login.password);
    I.seeElement(this.auth.login.button);
  },

  switchFormTo(text) {
    const formatedText = text.toLowerCase().split(" ");
    const atr = formatedText[0] + formatedText[1];
    I.seeElement(`//a[@class="switch"][@data-switch="${atr}"][text()="${text}"]`);
    I.click(`//a[@class="switch"][@data-switch="${atr}"][text()="${text}"]`);
  },

  async signUp(email, password) {
    I.fillField(this.auth.signup.email, email);
    I.fillField(this.auth.signup.password, password);
    I.fillField(this.auth.signup.confirm, password);
    const isElement = await I.grabNumberOfVisibleElements(this.auth.recaptcha.container);
    if (isElement === 1) {
      I.checkOption(this.auth.recaptcha.checkbox);
    }
    I.click(this.auth.signup.button);
    I.switchTo();
  },

  async logIn(email, password) {
    I.fillField(this.auth.login.email, email);
    I.fillField(this.auth.login.password, password);
    const isElement = await I.grabNumberOfVisibleElements(this.auth.recaptcha.container);
    if (isElement === 1) {
      I.checkOption(this.auth.recaptcha.checkbox);
    }
    I.click(this.auth.login.button);
    I.switchTo();
  },
};
