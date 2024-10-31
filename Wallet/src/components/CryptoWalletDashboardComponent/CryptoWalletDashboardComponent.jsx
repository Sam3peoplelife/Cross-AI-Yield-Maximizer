import React, { useEffect, useRef } from "react";
import "./css/style.css";
import "./css/animation.css";
import runAnimations, { allLinks, allFunctions } from "./scripts";
import texts from "./data/texts";
import images from "./data/images";

//The data/*.js files are objects for default data, use the component with prop values of your choice/requirement

const CryptoWalletDashboardComponent = ({ user, ...props }) => {
  const {
    walletaddresstext = user?.accounts?.near || texts.walletaddresstext,
    allaccountstext = texts.allaccountstext,
    currencylabeltext = texts.currencylabeltext,
    totalbalanceamounttext = texts.totalbalanceamounttext,
    balancechangetext = texts.balancechangetext,
    sendbuttontext = texts.sendbuttontext,
    receivebuttontext = texts.receivebuttontext,
    quicksendtitletext = texts.quicksendtitletext,
    quicksendsubtitletext = texts.quicksendsubtitletext,
    transactionstitletext = texts.transactionstitletext,
    convertfromlabeltext = texts.convertfromlabeltext,
    convertfromvaluetext = texts.convertfromvaluetext,
    convertfromcurrencytext = texts.convertfromcurrencytext,
    converttolabeltext = texts.converttolabeltext,
    converttovaluetext = texts.converttovaluetext,
    converttocurrencytext = texts.converttocurrencytext,
    popupsendtitletext = texts.popupsendtitletext,
    popupsendtimetext = texts.popupsendtimetext,
    popupsendamounttext = texts.popupsendamounttext,
    popuparrivedtitletext = texts.popuparrivedtitletext,
    popuparrivedtimetext = texts.popuparrivedtimetext,
    popuparrivedamounttext = texts.popuparrivedamounttext,
    walletinfotitletext = texts.walletinfotitletext,
    walletaddresstext1 = texts.walletaddresstext1,
    wallettypetext = texts.wallettypetext,
  } = props;
  useEffect(() => {
    runAnimations();
  }, []);

  return (
    <div className="wrapper-div-261808">
      <div className="main-frame" id="id-261808">
        {/* card_carusel1 */}
        <section className="card-carousel" id="id-261552">
          <div className="background-container pos-abs" id="id-2731035">
            <div className="background-frame" id="id-2731033"></div>
          </div>

          <div className="wallet-settings" id="id-261575">
            <div className="wallet-select" id="id-261580">
              <div className="wallet-icon" id="id-261581"></div>

              <div className="wallet-address" id="id-261582">
                <span className="wallet-address-1">{walletaddresstext}</span>
              </div>

              <div className="chevron-down-icon" id="id-261583">
                <div
                  className="chevron-icon pos-abs"
                  id="id-I261583_10276770"
                >
                  <div
                    className="nodeBg-I261583_10276770 pos-abs pos-init fill-parent image-div bg-contain bg-no-repeat "
                    id="id-bg-I261583_10276770"
                  ></div>
                </div>
              </div>
            </div>

            <div className="settings-button" id="id-2731036">
              <div className="settings-button-background pos-abs" id="id-261576">
              <div className="settings-icon-container" id="id-261577">
                <div className="settings-icon-outer" id="id-261579">
                  <div
                    className="nodeBg-261579 pos-abs pos-init fill-parent image-div bg-contain bg-no-repeat "
                    id="id-bg-261579"
                  >
                    </div>
                <div className="settings-icon-inner pos-abs" id="id-261578">
                  <div
                    className="nodeBg-261578 pos-abs pos-init fill-parent image-div bg-contain bg-no-repeat "
                    id="id-bg-261578"
                  ></div>
                </div>
              </div>
                  </div>
                </div>
              
            </div>
          </div>

          <div className="frame-123">
          <div className="all-accounts-label" id="id-261554">
            <span className="all-accounts-label-1">{allaccountstext}</span>
          </div>

          <div className="total-balance-label" id="id-261555"></div>

          <div className="currency-button" id="id-261570">
            <div className="currency-label" id="id-261571">
              <span className="currency-label-1">{currencylabeltext}</span>
            </div>

            <div className="change-currency-icon" id="id-261572">
              <div className="change-currency-icon-top" id="id-261573">
                <div
                  className="nodeBg-261573 pos-abs pos-init fill-parent image-div bg-contain bg-no-repeat "
                  id="id-bg-261573"
                ></div>
              </div>

              <div className="change-currency-icon-bottom" id="id-261574">
                <div
                  className="nodeBg-261574 pos-abs pos-init fill-parent image-div bg-contain bg-no-repeat "
                  id="id-bg-261574"
                ></div>
              </div>
            </div>
          </div>
          </div>

          <div className="frame-124">
          <div className="total-balance-amount" id="id-261556">
            <span className="total-balance-amount-1">{totalbalanceamounttext}</span>
          </div>

          <div className="balance-change" id="id-261557">
            <span className="balance-change-1">{balancechangetext}</span>
          </div>
          </div>

          <div className="action-buttons-container" id="id-261558">
            <div className="action-buttons-wrapper" id="id-261560">
              <div className="send-button" id="id-261561">
                <div
                  className="send-button-background pos-abs"
                  id="id-261562"
                ></div>

                <div className="send-button-text" id="id-261563">
                  <span className="send-button-text-1">{sendbuttontext}</span>
                </div>
              </div>

              <div className="receive-button" id="id-261564">
                <div className="receive-button-text" id="id-261566">
                  <span className="receive-button-text-1">{receivebuttontext}</span>
                </div>
              </div>

              <div className="add-button" id="id-261567">
                <div className="add-icon" id="id-261569">
                  <div
                    className="add-icon-symbol pos-abs"
                    id="id-I261569_1418689"
                  >
                    <div
                      className="nodeBg-I261569_1418689 pos-abs pos-init fill-parent image-div bg-contain bg-no-repeat "
                      id="id-bg-I261569_1418689"
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* quick_send1 */}
        <section className="quick-send-container" id="id-261585">
          <div className="quick-send-background pos-abs" id="id-2731037">
            <div
              className="quick-send-background-frame"
              id="id-I2731037_2731033"
            ></div>
          </div>

          <div className="quick-send-mask-group" id="id-261590">
            <div
              className="pos-abs pos-init fill-parent bg-contain bg-no-repeat image-div nodeBg-261590"
              id="id-bg-261590"
              alt="261590-ALT"
            >
              {" "}
            </div>
          </div>

          <div className="quick-send-text-container pos-abs" id="id-261587">
            <div className="quick-send-title" id="id-261589">
              <span className="quick-send-title-1">{quicksendtitletext}</span>
            </div>

            <div className="quick-send-subtitle" id="id-261588">
              <span className="quick-send-subtitle-1">{quicksendsubtitletext}</span>
            </div>
          </div>

          <div className="quick-send-icon pos-abs" id="id-261602">
            <div className="quick-send-icon-background pos-abs" id="id-261603"></div>

            <div className="quick-send-arrow-icon" id="id-261604">
              <div
                className="quick-send-arrow-symbol pos-abs"
                id="id-I261604_10079284"
              >
                <div
                  className="nodeBg-I261604_10079284 pos-abs pos-init fill-parent image-div bg-contain bg-no-repeat "
                  id="id-bg-I261604_10079284"
                ></div>
              </div>
            </div>
          </div>

          <div className="quick-send-more-button pos-abs" id="id-261605">
            <div className="quick-send-more-button-background pos-abs" id="id-261606"></div>

            <div className="quick-send-more-button-symbol" id="id-261607">
              <div
                className="nodeBg-261607 pos-abs pos-init fill-parent image-div bg-contain bg-no-repeat "
                id="id-bg-261607"
              ></div>
            </div>
          </div>
        </section>
        {/* transactions1 */}
        <section className="transactions-container" id="id-261608">
          <div className="transactions-wrapper" id="id-261609">
            <div className="transactions-background pos-abs" id="id-2731040">
              <div
                className="transactions-background-frame"
                id="id-I2731040_2731033"
              ></div>
            </div>

            <div className="transactions-icon pos-abs" id="id-261611">
              <div className="transactions-icon-background pos-abs" id="id-261612"></div>

              <div className="transactions-icon-symbol" id="id-261613">
                <div
                  className="pos-abs image-div bg-no-repeat fill-parent bg-contain nodeBg-261613 "
                  id="id-bg-261613"
                >
                  {" "}
                </div>
              </div>
            </div>

            <div className="transactions-title pos-abs" id="id-261614">
              <span className="transactions-title-1">{transactionstitletext}</span>
            </div>

            <div className="transactions-more-button pos-abs" id="id-261615">
              <div className="transactions-more-button-symbol" id="id-261617">
                <div
                  className="nodeBg-261617 pos-abs pos-init fill-parent image-div bg-contain bg-no-repeat "
                  id="id-bg-261617"
                ></div>
              </div>
            </div>

            <div className="transactions-list pos-abs" id="id-2731044">
              <div className="transactions" id="id-261618">
                {/* next transaction */}
                
              <div className="transaction-id">
                    {/* info1 */}
                    <section className="transaction-info">
                      <div className="transaction-crypto">
                        <div className="transaction-subtract pos-abs">
                          <img
                            src="https://firebasestorage.googleapis.com/v0/b/figma-plugin-a7287.appspot.com/o/user-images%2F27-oct-2024%2Fjedela63851730054694657%2Fimage-I230-669_4-18.png?alt=media&token=0"
                            className="pos-abs pos-init fill-parent bg-contain bg-no-repeat image-div  object-fit"
                            alt="I230669_418-ALT"
                          />{" "}
                        </div>
                      </div>

                      <div className="transaction-crypto">
                        <div className="transaction-bitcoin-id">
                          <span className="transaction-bitcoin-id-acc">{walletaddresstext}</span>
                        </div>
                          <span className="btc-230672-0">{allaccountstext}</span>
                      </div>
                    </section>
                    {/* info2 */}
                    <section className="transaction-inf">
                      <div className="transaction-info-cur">
                        <span className="transaction-info-cur-txt">{currencylabeltext}</span>
                      </div>

                      <div className="transaction-send">
                        <span className="transaction-send-txt">{totalbalanceamounttext}</span>
                      </div>
                    </section>
                  </div>
                  {/* next transaction */}
                  <div className="transaction-id">
                    {/* info1 */}
                    <section className="transaction-info">
                      <div className="transaction-crypto">
                        <div className="transaction-subtract pos-abs">
                          <img
                            src="https://firebasestorage.googleapis.com/v0/b/figma-plugin-a7287.appspot.com/o/user-images%2F27-oct-2024%2Fjedela63851730054694657%2Fimage-I230-669_4-18.png?alt=media&token=0"
                            className="pos-abs pos-init fill-parent bg-contain bg-no-repeat image-div  object-fit"
                            alt="I230669_418-ALT"
                          />{" "}
                        </div>
                      </div>

                      <div className="transaction-crypto">
                        <div className="transaction-bitcoin-id">
                          <span className="transaction-bitcoin-id-acc">{walletaddresstext}</span>
                        </div>
                          <span className="btc-230672-0">{allaccountstext}</span>
                      </div>
                    </section>
                    {/* info2 */}
                    <section className="transaction-inf">
                      <div className="transaction-info-cur">
                        <span className="transaction-info-cur-txt">{currencylabeltext}</span>
                      </div>

                      <div className="transaction-send">
                        <span className="transaction-send-txt">{totalbalanceamounttext}</span>
                      </div>
                    </section>
                  </div><div className="transaction-id">
                    {/* info1 */}
                    <section className="transaction-info">
                      <div className="transaction-crypto">
                        <div className="transaction-subtract pos-abs">
                          <img
                            src="https://firebasestorage.googleapis.com/v0/b/figma-plugin-a7287.appspot.com/o/user-images%2F27-oct-2024%2Fjedela63851730054694657%2Fimage-I230-669_4-18.png?alt=media&token=0"
                            className="pos-abs pos-init fill-parent bg-contain bg-no-repeat image-div  object-fit"
                            alt="I230669_418-ALT"
                          />{" "}
                        </div>
                      </div>

                      <div className="transaction-crypto">
                        <div className="transaction-bitcoin-id">
                          <span className="transaction-bitcoin-id-acc">{walletaddresstext}</span>
                        </div>
                          <span className="btc-230672-0">{allaccountstext}</span>
                      </div>
                    </section>
                    {/* info2 */}
                    <section className="transaction-inf">
                      <div className="transaction-info-cur">
                        <span className="transaction-info-cur-txt">{currencylabeltext}</span>
                      </div>

                      <div className="transaction-send">
                        <span className="transaction-send-txt">{totalbalanceamounttext}</span>
                      </div>
                    </section>
                  </div>
              </div>
            </div>
          </div>
        </section>
        {/* convert1 */}
        <section className="convert-container" id="id-261622">
          <div className="convert-background pos-abs" id="id-I261622_232877">
            <div
              className="pos-abs pos-init fill-parent bg-contain bg-no-repeat image-div nodeBg-I261622_232877"
              id="id-bg-I261622_232877"
              alt="I261622_232877-ALT"
            >
              {" "}
            </div>
          </div>

          <div className="convert-from-info pos-abs" id="id-I261622_232880">
            <div className="convert-from-amount" id="id-I261622_232881">
              <div className="convert-from-label" id="id-I261622_232882">
                <span className="convert-from-label-1">{convertfromlabeltext}</span>
              </div>

              <div className="convert-from-value" id="id-I261622_232883">
                <span className="convert-from-value-1">{convertfromvaluetext}</span>
              </div>
            </div>

            <div className="convert-from-currency" id="id-I261622_232884">
              <div className="convert-from-currency-code" id="id-I261622_232885">
                <span className="convert-from-currency-code-1">{convertfromcurrencytext}</span>
              </div>

              <div className="convert-from-currency-dropdown" id="id-I261622_232886">
                <div
                  className="nodeBg-I261622_232886 pos-abs pos-init fill-parent image-div bg-contain bg-no-repeat "
                  id="id-bg-I261622_232886"
                ></div>
              </div>
            </div>
          </div>

          <div className="convert-to-info pos-abs" id="id-I261622_232887">
            <div className="convert-to-amount" id="id-I261622_232888">
              <div className="convert-to-label" id="id-I261622_232889">
                <span className="convert-to-label-1">{converttolabeltext}</span>
              </div>

              <div className="convert-to-value" id="id-I261622_232890">
                <span className="convert-to-value-1">{converttovaluetext}</span>
              </div>
            </div>

            <div className="convert-to-currency" id="id-I261622_232891">
              <div className="convert-to-currency-code" id="id-I261622_232892">
                <span className="convert-to-currency-code-1">{converttocurrencytext}</span>
              </div>

              <div className="convert-to-currency-dropdown" id="id-I261622_232893">
                <div
                  className="nodeBg-I261622_232893 pos-abs pos-init fill-parent image-div bg-contain bg-no-repeat "
                  id="id-bg-I261622_232893"
                ></div>
              </div>
            </div>
          </div>

          <div
            className="convert-button pos-abs"
            id="id-I261622_232894"
          >
            <div
              className="convert-button-background pos-abs"
              id="id-I261622_232894_232898"
            ></div>

            <div
              className="convert-button-border pos-abs"
              id="id-I261622_232894_232899"
            ></div>

            <div
              className="convert-icon pos-abs"
              id="id-I261622_232894_232900"
            >
              <div
                className="convert-icon-arrows pos-abs"
                id="id-I261622_232894_232900_232830"
              >
                <div
                  className="convert-icon-arrow-right pos-abs"
                  id="id-I261622_232894_232900_232831"
                >
                  <div
                    className="nodeBg-I261622_232894_232900_232831 pos-abs pos-init fill-parent image-div bg-contain bg-no-repeat "
                    id="id-bg-I261622_232894_232900_232831"
                  ></div>
                </div>

                <div
                  className="convert-icon-arrow-left pos-abs"
                  id="id-I261622_232894_232900_232832"
                >
                  <div
                    className="nodeBg-I261622_232894_232900_232832 pos-abs pos-init fill-parent image-div bg-contain bg-no-repeat "
                    id="id-bg-I261622_232894_232900_232832"
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* popup_send1 */}
        <section className="popup-send" id="id-261624">
          <div className="popup-send-background pos-abs" id="id-261625"></div>

          <div className="popup-send-content" id="id-261626">
            <div className="popup-send-icon" id="id-261629">
              <div className="popup-send-icon-background pos-abs" id="id-261630"></div>

              <div className="popup-send-arrow-icon" id="id-261631">
                <div
                  className="popup-send-arrow-symbol pos-abs"
                  id="id-I261631_10079284"
                >
                  <div
                    className="nodeBg-I261631_10079284 pos-abs pos-init fill-parent image-div bg-contain bg-no-repeat "
                    id="id-bg-I261631_10079284"
                  ></div>
                </div>
              </div>
            </div>

            <div className="popup-send-text" id="id-2731052">
              <div className="popup-send-title" id="id-261627">
                <span className="popup-send-title-1">{popupsendtitletext}</span>
              </div>

              <div className="popup-send-time" id="id-261628">
                <span className="popup-send-time-1">{popupsendtimetext}</span>
              </div>
            </div>
          </div>

          <div className="popup-send-amount" id="id-261632">
            <span className="popup-send-amount-1">{popupsendamounttext}</span>
          </div>
        </section>
        {/* popup_arrived1 */}
        <section className="popup-arrived" id="id-261633">
          <div className="popup-arrived-background pos-abs" id="id-261634"></div>

          <div className="popup-arrived-content" id="id-261635">
            <div className="popup-arrived-icon" id="id-261638">
              <div className="popup-arrived-icon-background pos-abs" id="id-261639"></div>

              <div className="popup-arrived-arrow-icon" id="id-261640">
                <div
                  className="popup-arrived-arrow-symbol pos-abs"
                  id="id-I261640_10079284"
                >
                  <div
                    className="nodeBg-I261640_10079284 pos-abs pos-init fill-parent image-div bg-contain bg-no-repeat "
                    id="id-bg-I261640_10079284"
                  ></div>
                </div>
              </div>
            </div>

            <div className="popup-arrived-text" id="id-2731072">
              <div className="popup-arrived-title" id="id-261636">
                <span className="popup-arrived-title-1">{popuparrivedtitletext}</span>
              </div>

              <div className="popup-arrived-time" id="id-261637">
                <span className="popup-arrived-time-1">{popuparrivedtimetext}</span>
              </div>
            </div>
          </div>

          <div className="popup-arrived-amount" id="id-261641">
            <span className="popup-arrived-amount-1">{popuparrivedamounttext}</span>
          </div>
        </section>
        {/* wallet_selection */}
        <section className="wallet-selection" id="id-261809">
          <div className="wallet-selection-container" id="id-261810">
            <div className="wallet-selection-wrapper pos-abs" id="id-261811">
              <div className="wallet-info-container" id="id-261812">
                <div className="wallet-info-wrapper" id="id-261813">
                  <div className="wallet-info-title" id="id-261814">
                    <span className="wallet-info-title-1">{walletinfotitletext}</span>
                  </div>

                  <div className="wallet-info-content" id="id-261815">
                    <div className="wallet-info-details" id="id-261816">
                      <div className="wallet-info-icon" id="id-261817"></div>

                      <div className="wallet-info-text" id="id-261818">
                        <div className="wallet-address-1" id="id-261819">
                          <span className="wallet-address-1-1">{walletaddresstext1}</span>
                        </div>

                        <div className="wallet-type" id="id-261820">
                          <span className="wallet-type-1">{wallettypetext}</span>
                        </div>
                      </div>
                    </div>

                    <div className="copy-wallet-id-button" id="id-261821">
                      <div className="copy-button-background" id="id-261822">
                        <div className="copy-icon" id="id-261823">
                          <div className="copy-icon-background pos-abs" id="id-261824">
                            <div
                              className="copy-icon-border pos-abs"
                              id="id-261825"
                            >
                              <div
                                className="nodeBg-261825 pos-abs pos-init fill-parent image-div bg-contain bg-no-repeat "
                                id="id-bg-261825"
                              ></div>
                            </div>
                          </div>

                          <div
                            className="copy-icon-symbol pos-abs"
                            id="id-261826"
                          >
                            <div
                              className="copy-icon-front pos-abs"
                              id="id-261827"
                            >
                              <div
                                className="nodeBg-261827 pos-abs pos-init fill-parent image-div bg-contain bg-no-repeat "
                                id="id-bg-261827"
                              ></div>
                            </div>

                            <div
                              className="copy-icon-back pos-abs"
                              id="id-261828"
                            >
                              <div
                                className="nodeBg-261828 pos-abs pos-init fill-parent image-div bg-contain bg-no-repeat "
                                id="id-bg-261828"
                              ></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="disconnect-wallet-container" id="id-261830">
                <div className="disconnect-wallet-button" id="id-261831">
                  <div
                    className="walletselection-I261831_10404-container "
                    id="id-I261831_10404">
                      <div className="text-2042809">
                        <span className="text-2042809-0">Disconnect Wallet</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="walletselection-261832-container " id="id-261832">
                <div className="text-2042809">
                  <span className="text-2042809-0">Add Walet</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
export default CryptoWalletDashboardComponent;
