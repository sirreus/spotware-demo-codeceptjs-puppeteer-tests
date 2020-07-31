const { I } = inject();

module.exports = {
  url: "/",
  popup: {
    eventWrapper: '//div[@data-focus-lock-disabled="false"]',
    container: "div.e__container",
    header: "div.e__header-title",
    body: {
      container: "div.e__body",
      header: "div.e__body>div._wq._sg",
      text: "",
      button: "div>button",
    },
  },
  modalDialog: {
    container: '//div[@class="b-dialog-outer topDialog"]',
    leftSide: {
      container: '//div[@class="leftColumn multipleBackground"]',
      switchAcc: '//li[@data-tab-id="SIGN_IN"]',
      demoAcc: '//li[@data-tab-id="DEMO"]',
      liveAcc: '//li[@data-tab-id="LIVE"]',
    },
    rightSide: {
      demoTab: {
        container: '//div[@class="b-demo-page page"]',
        header: '//div[@class="b-demo-page page"]/form/h2',
        depositAmountInput:
          '//div[@class="depositContainer"]/div[contains(@class, "depositList")]//input[contains(@class, "editBox")]',
        depositAmountDefault:
          '//div[@class="depositContainer"]/div[contains(@class, "depositList")]/input',
        depositCurrencyDefault:
          '//div[@class="depositContainer"]/div[contains(@class, "depositCurrencyList")]/input',
        leverageContainerDefault:
          '//div[@class="leverageContainer"]/div[contains(@class, "leverageList")]/input',
        accountTypeDefault: '//div[contains(@class, "accountType")]/input',
        notSwapFree: '//div[contains(@class, "swapFree")]/div[@class="box"]',
        createAccountBtn: '//button[contains(@class, "green")]',
      },
      container: '//div[@class="rightColumn dialogContent"]',
      header: '//div[@class="rightColumn dialogContent"]/div[@class="page"]//h2',
      label: '//div[@class="rightColumn dialogContent"]/div[@class="page"]//label',
      input:
        '//div[@class="rightColumn dialogContent"]/div[@class="page"]//input[@name="accountNumber_Spotware"]',
    },
    closeBtn: '//div[@class="a__root spinner-i _bj _aq _ak _x"]',
  },
  root: '//div[@id="root"]//div[@class="spinner-i _ai _x _aj"]',
  leftMenu: {
    container: '//div[@class="menuBar appMenuBar leftBar"]',
    submenu: {
      container: '//div[contains(@class, "has-submenu")]//div[text()="Spotware cTrader"]',
      dropdown: {
        wrapper:
          '//div[@data-test-id="tooltip"]/div[contains(@class, "k__dropdown-block")]/div[@data-test-id="dropdown-menu"]',
        switchAccountBtn: '//div[text()="Переключить Cчет"]',
      },
    },
  },
  rightMenu: {
    scrollArrowRight: '//div[@class="scrollArrow right"]',
    workspace: {
      block:
        '//div[@class="k__root spinner-i _dh _bj"]/div[contains(@class, "k__selected-block")][@data-test-id="top-menu-dropdown"][2]',
      name: '//div[@data-test-id="workspaces-top-bar-item-target"]',
      dropdown: {
        wrapper:
          '//div[@data-test-id="tooltip"]/div[contains(@class, "k__dropdown-block")]/div[@data-test-id="dropdown-menu"]',
        listWrapper: '//div[@data-test-id="workspace-control-panel"]/div[1]',
        listItem: '//div[@class="o__content _ib spinner-i _ah _g _ak _ai"]',
        listItemText:
          '//div[@class="o__content _ib spinner-i _ah _g _ak _ai"]//div[contains(@class, "v__text")]',
      },
    },
    account: {
      block:
        '//div[@class="k__root spinner-i _dh _bj"]/div[contains(@class, "k__selected-block")][@data-test-id="top-menu-dropdown"][3]',
      name: '//div[@class="v__root spinner-i _bj _di _al _cy _dj _ai _fc"]/span[1]',
      id: '//div[@class="v__root spinner-i _bj _di _al _cy _dj _ai _fc"]/span[3]',
      type: '//div[@class="v__root spinner-i _bj _di _al _cy _dj _ai _fc"]/span[5]',
      dropdown: {
        wrapper:
          '//div[@data-test-id="tooltip"]/div[contains(@class, "k__dropdown-block")]/div[@data-test-id="dropdown-menu"]',
        accountListWrapper: '//div[@class="v__root _bz"]',
        list: '//div[@class="v__root _bz"]/div[1]/div[2]',
        item:
          '//div[contains(@class, "k__root _xt _g _afm _ak")]/div[@class="spinner-i _hd _bj _afi"]',
        listItem: '//div[@class="v__root _bz"]/div[1]/div[2]/div',
        accountName: '//div[@class="v__text _ai _fc"]//span[1]',
        accountId: '//div[@class="v__text _ai _fc"]//span[3]',
        accountType: '//div[@class="v__text _ai _fc"]//span[5]',
        accountBalance: '//div[@class="v__text _ai _fc"]//span[7]',
        createAccountBtn:
          '//div[@class="v__root _bz"]/div[3]/div[2]/div[@class="v__text _ai _fc"]',
      },
    },
    profile: {
      block:
        '//div[@class="k__root spinner-i _dh _bj"]/div[contains(@class, "k__selected-block")][@data-test-id="top-menu-dropdown"][4]',
      dropdown: {
        logoutBtn: '//div[@class="v__text _ai _fc"][text()="Выйти"]',
      },
    },
  },

  async checkNotifications() {
    I.waitForVisible("body.loading.b-body-spotware.dark.cursor_single_mode", 15);
    I.waitForVisible(
      '//div[@data-test-id="notification"]//div[@data-test-id="notification-body"][contains(text(), " was linked to your cTrader ID")]'
    );
    let text = await I.grabTextFrom(
      '//div[@data-test-id="notification"]//div[@data-test-id="notification-body"][contains(text(), " was linked to your cTrader ID")]'
    );
    let id_ = text.split(" was linked to your cTrader ID")[0];
    console.log(id_);
    let expectedAccountId = id_.split(" ")[1];
    I.waitForVisible(
      '//div[@data-test-id="notification"]//div[@data-test-id="notification-body"][text()="Рабочее пространство «My Workspace» загружено."]'
    );
  },

  async checkEULAPopupIsVisible() {
    I.wait(3);
    I.waitForVisible(this.root, 10);
    const isElement = await I.grabStateOfElementInDOM(this.popup.eventWrapper);
    if (isElement) {
      I.waitForElement(this.popup.container, 10);
      I.waitForElement(this.popup.header, 10);
      I.waitForElement(this.popup.body.header, 10);
      within(this.popup.body.container, () => {
        // I.waitForText("Принять и Продолжить", 10, this.popup.body.button);
        I.click(this.popup.body.button);
      });
    } else {
      I.dontSeeElement(this.popup.container);
    }
  },

  async checkNewTradingAccountWasCreate() {
    I.waitForVisible(this.rightMenu.account.block);
    const accountId = await within(this.rightMenu.account.block, async () => {
      const accountName = await I.grabTextFrom(this.rightMenu.account.name);
      I.assertEqual(accountName, "Демо");
      const actualAccountId = await I.grabTextFrom(this.rightMenu.account.id);
      const accountType = await I.grabTextFrom(this.rightMenu.account.type);
      I.assertEqual(accountType, "Хеджинг");
      return actualAccountId;
    });
    return accountId;
  },

  async checkIsAccountInNavMenu(expectedAccountId) {
    I.moveCursorTo(this.rightMenu.account.block);
    I.waitForVisible(this.rightMenu.account.dropdown.wrapper, 15);
    I.seeElement(this.rightMenu.account.dropdown.accountListWrapper);
    I.seeNumberOfElements(this.rightMenu.account.dropdown.listItem, 1);
    const actualAccountId = await I.grabTextFrom(this.rightMenu.account.dropdown.accountId);
    I.assertEqual(actualAccountId, expectedAccountId);
  },

  clickOnCreateNewTradingAccount() {
    I.moveCursorTo(this.rightMenu.account.block);
    I.waitForVisible(this.rightMenu.account.dropdown.wrapper, 15);
    I.seeElement(this.rightMenu.account.dropdown.accountListWrapper);
    // I.waitForVisible(this.rightMenu.account.dropdown.createAccountBtn, 10);
    I.waitForText(
      "Открыть новый торговый счет",
      5,
      this.rightMenu.account.dropdown.createAccountBtn
    );
    I.click(this.rightMenu.account.dropdown.createAccountBtn);
  },

  openModalDialogSwitchAccount() {
    I.waitForVisible(this.leftMenu.container, 5);
    I.seeElement(this.leftMenu.submenu.container);
    I.moveCursorTo(this.leftMenu.submenu.container);
    I.waitForVisible(this.leftMenu.submenu.dropdown.wrapper, 15);
    I.seeElement(this.leftMenu.submenu.dropdown.switchAccountBtn);
    I.click(this.leftMenu.submenu.dropdown.switchAccountBtn);
  },

  checkIsAccountInModalDialog(expectedAccountId) {
    I.waitForVisible(this.modalDialog.container, 10);
    I.waitForText("Переключить Cчет", 5, this.modalDialog.rightSide.header);
    I.waitForText("Номер счета", 5, this.modalDialog.rightSide.label);
    I.seeAttributesOnElements(this.modalDialog.rightSide.input, { value: expectedAccountId });
    I.click(this.modalDialog.closeBtn);
  },

  openDemoAccountTabInModalDialog() {
    I.waitForVisible(this.modalDialog.leftSide.container, 5);
    I.waitForText("Демо Счет", 5, this.modalDialog.leftSide.demoAcc);
    I.click(this.modalDialog.leftSide.demoAcc);
  },

  demoAccountTabShouldBePresentWithDafualtValues(defaultAccountValue) {
    I.waitForVisible(this.modalDialog.rightSide.demoTab.container);
    I.seeAttributesOnElements(this.modalDialog.rightSide.demoTab.depositAmountDefault, {
      value: defaultAccountValue.depositValue,
    });
    I.seeAttributesOnElements(this.modalDialog.rightSide.demoTab.depositCurrencyDefault, {
      value: defaultAccountValue.depositCurrency,
    });
    I.seeAttributesOnElements(this.modalDialog.rightSide.demoTab.leverageContainerDefault, {
      value: defaultAccountValue.leverageContainer,
    });
    I.seeAttributesOnElements(this.modalDialog.rightSide.demoTab.accountTypeDefault, {
      value: defaultAccountValue.type.Hedging,
    });
    I.seeElement(this.modalDialog.rightSide.demoTab.notSwapFree);
  },

  setDepositAmount(amount) {
    I.seeElement(this.modalDialog.rightSide.demoTab.depositAmountInput);
    I.clearField(this.modalDialog.rightSide.demoTab.depositAmountInput);
    I.fillField(this.modalDialog.rightSide.demoTab.depositAmountInput, amount);
    I.seeAttributesOnElements(this.modalDialog.rightSide.demoTab.depositAmountDefault, {
      value: amount.toString(),
    });
  },

  async checkBalanceFromNewAccount(expectedBalance) {
    I.waitForVisible(this.rightMenu.account.block);
    I.moveCursorTo(this.rightMenu.account.block);
    I.waitForVisible(this.rightMenu.account.dropdown.wrapper, 15);
    I.seeElement(this.rightMenu.account.dropdown.list);
    const expectedListItemsAmount = await I.grabNumberOfVisibleElements(
      this.rightMenu.account.dropdown.item
    );
    within(
      this.rightMenu.account.dropdown.listItem.replace(
        "/div[2]/div",
        `/div[2]/div[${expectedListItemsAmount}]`
      ),
      async () => {
        const actualBalance = await I.grabTextFrom(
          this.rightMenu.account.dropdown.accountBalance
        );
        actualBalance = actualBalance.split(" ")[1];
        I.assertEqual(actualBalance, expectedBalance.toString());
      }
    );
  },

  async checkWorkspaceFromNavMenu() {
    I.waitForVisible(this.rightMenu.workspace.block, 5);
    const workspaceName = await I.grabTextFrom(this.rightMenu.workspace.name);
    I.moveCursorTo(this.rightMenu.workspace.block);
    I.waitForVisible(this.rightMenu.workspace.dropdown.wrapper, 15);
    I.seeNumberOfElements(this.rightMenu.workspace.dropdown.listItem, 1);
    I.waitForText(workspaceName, 5, this.rightMenu.workspace.dropdown.listItemText);
  },

  async signOut() {
    let isScrolled = await I.grabNumberOfVisibleElements(
      this.rightMenu.scrollArrowRight.replace('right"]', 'right disabled"]')
    );
    if (isScrolled !== 1) {
      while (isScrolled === 0) {
        I.click(this.rightMenu.scrollArrowRight);
        isScrolled = await I.grabNumberOfVisibleElements(
          this.rightMenu.scrollArrowRight.replace('right"]', 'right disabled"]')
        );
      }
    }
    I.seeElement(this.rightMenu.profile.block);
    I.moveCursorTo(this.rightMenu.profile.block);
    I.waitForVisible(this.rightMenu.profile.dropdown.logoutBtn, 5);
    I.click(this.rightMenu.profile.dropdown.logoutBtn);
  },
};
