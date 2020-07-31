Feature("Demo tests for Spotware").config({
  restart: false,
  keepCookies: true,
  keepBrowserState: true,
});

const chance = require("chance").Chance();
const user = new Object();

BeforeSuite(() => {
  user.email = `keg.tezt+${chance.integer({ min: 0, max: 1000 })}@gmail.com`;
  user.password = chance.string({ length: 8, casing: "upper", alpha: true, numeric: true });
});

Before((I) => {
  I.amOnPage("/");
});

Scenario("cTid creation", async (Auth, Workspace) => {
  Auth.pageShouldBePresent();
  Auth.authFormShouldBePresent();
  Auth.signupFormShouldBeVisible();
  await Auth.signUp(user.email, user.password);

  // await Workspace.checkNotifications();
  await Workspace.checkEULAPopupIsVisible();
  const accountId = await Workspace.checkNewTradingAccountWasCreate();
  user.accountId = accountId;
  await Workspace.signOut();

  Auth.authFormShouldBePresent();
  Auth.loginFormShouldBeVisible();
});

Scenario("Log In by existed user", async (I, Auth, Workspace) => {
  Auth.pageShouldBePresent();
  Auth.authFormShouldBePresent();
  Auth.loginFormShouldBeVisible();
  await Auth.logIn(user.email, user.password);

  // I.wait(10); // await Workspace.checkEULAPopupIsVisible();
  I.waitForVisible(Workspace.root, 10);
  I.dontSeeElementInDOM(Workspace.popup.eventWrapper);
  I.dontSeeElement(Workspace.popup.container);

  await Workspace.checkIsAccountInNavMenu(user.accountId);
  await Workspace.openModalDialogSwitchAccount();
  Workspace.checkIsAccountInModalDialog(user.accountId);
  await Workspace.checkWorkspaceFromNavMenu();

  I.closeCurrentTab();
});

Scenario("Add a new Demo account", async (I, Auth, Workspace) => {
  // Auth.pageShouldBePresent();
  // Auth.authFormShouldBePresent();
  // Auth.switchFormTo("Log in");
  // Auth.loginFormShouldBeVisible();
  // await Auth.logIn(user.email, user.password);

  I.waitForVisible(Workspace.root, 10);
  Workspace.clickOnCreateNewTradingAccount();
  Workspace.checkIsAccountInModalDialog(user.accountId);
  Workspace.openDemoAccountTabInModalDialog();

  const defaultAccountValue = {
    depositValue: "1000",
    depositCurrency: "EUR",
    leverageContainer: "1 : 100 (По умолчанию)",
    type: {
      Hedging: "0",
    },
  };
  const newBalance = 123456;
  Workspace.demoAccountTabShouldBePresentWithDafualtValues(defaultAccountValue);
  Workspace.setDepositAmount(newBalance);
  I.click(Workspace.modalDialog.rightSide.demoTab.createAccountBtn);
  await Workspace.checkBalanceFromNewAccount(newBalance);
});
