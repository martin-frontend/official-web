<template>
  <Container>
    <section>
      <OutlineCard>
        <div class="termsCard">
          <div class="termsCard__title">
            {{ 'Terms of Accounts, Payouts & Bonuses' }}
          </div>
          <div class="termsCard__block">
            <div class="termsCard__title">
              {{ 'Accounts' }}
            </div>
            <div class="termsCard__content">
              <ul class="termsList">
                <li class="termsList__item">
                  <span>
                    {{
                      '1. After opening Your Account, You must take all reasonable steps to avoid disclosing (whether deliberately or accidentally) Your username, password and/or account number to anyone else, including (where practicable) ensuring that up-to-date security software is downloaded onto Your Access Device. '
                    }}
                  </span>
                </li>
                <li class="termsList__item">
                  <span>
                    {{
                      '7.2 All transactions made where Your username and password and/or account number have been entered correctly will be regarded as valid, whether or not authorised by You, and we shall not be liable for any claims in the event that You disclose Your username, password or account number to anyone else (whether deliberately or accidentally). '
                    }}
                  </span>
                </li>
                <li class="termsList__item">
                  <span>
                    {{
                      '7.3 If You have lost or forgotten Your Account details, or have a reason to believe that such details are known to an unauthorised third party, please contact us immediately for a replacement through Support@abc.com, details of which can be found in the Contact Us. '
                    }}
                  </span>
                </li>
              </ul>
            </div>
          </div>
          <div class="termsCard__block">
            <div class="termsCard__title">
              {{ 'Bonuses' }}
            </div>
            <div class="termsCard__content">
              <ul class="termsList">
                <li class="termsList__item">
                  <span>
                    {{
                      '1. ABC reserves the right to remove, add or change any bonus that is available in the account of any Customer and has not been claimed. Any claimed and active bonus will not be removed by ABC under regular circumstances.'
                    }}
                  </span>
                </li>
                <li class="termsList__item">
                  <span>
                    {{
                      '9.2. Bonuses might have wagering requirements attached to them. These requirements will be appropriately displayed before the Customer decides to use a bonus when wagering requirements are applicable. Withdrawal amounts will be only possible for the real money balance the bonus money balance upon withdrawal will be lost. ABC has the right to choose which game and service contributes what amount to the wagering requirements. The wagering requirements have a minimum of 25 times the amount of bonus and the real money sum contributing to the bonus figure.'
                    }}
                  </span>
                </li>
                <li class="termsList__item">
                  <span>
                    {{
                      '9.3. Bonuses can be received once per person (Customer), per household, per address, per mobile phone, per shared computer and per shared IP address. Risk-free bets on any games or services do not count toward the wagering requirements. Winnings from free spins are added to the real money balance. '
                    }}
                  </span>
                </li>
                <li class="termsList__item">
                  <span>
                    {{
                      '9.4. The maximum amount of money to be won from a no deposit free spin bonus and gameplay with mentioned bonus funds is 50 EUR or any other currency equivalent. Any winnings exceeding 50 EUR without making a real money deposit will be void and will be kept by ABC. Example, a customer receives a no deposit free spins bonus. The free spins get played out and the customer wins 10 EUR. The customer proceeds to play other games and wins 90 EUR, totaling 100 EUR in the ABC cashier. In this case the customer has exceeded the cap of 50 EUR winnings, 50 EUR will be available for withdrawing and 50 EUR will be kept by ABC.'
                    }}
                  </span>
                </li>
                <li class="termsList__item">
                  <span>
                    {{
                      '9.5. The maximum bet when having an active bonus is EUR 5 per spin or EUR 0.5 per bet line. ABC reserves the right to void bets and wager turnovers resulting from larger bets made on games and/or services of ABC. '
                    }}
                  </span>
                </li>
                <li class="termsList__item">
                  <span>
                    {{
                      '9.6. ABC reserves the right to impose various restrictions to different countries where Customers may reside regarding bonuses for reasons undisclosed. We further reserve the right to offer specific bonuses to individual customers or customer groups and their termination, change or other alteration without explanation and/or compensations in any form. '
                    }}
                  </span>
                </li>
                <li class="termsList__item">
                  <span>
                    {{
                      '9.7. If a player or a group of players are abusing casino bonuses ABC has the right to confiscate any wins thereof and to close the players account(s). Abusive behaviour towards bonuses and/or bonus abuse means: '
                    }}
                  </span>
                  <ul class="termsList termsList--dot">
                    <li>
                      {{
                        'i. A Player places bets and/or wagers amounting to the maximum allowed per bonus terms to raise the variance in order increase the balance '
                      }}
                    </li>
                    <li>
                      {{
                        'ii. Player lowers the bet and/or wager size after a big win and changes the game to one with a lower volatility '
                      }}
                    </li>
                    <li>
                      {{
                        'iii. Player makes deposits to cap out the bonus amount but not more. Applicable to match bonuses of 50% and above After the account has been flagged as bonus abusing it is forbidden to use any other bonuses and/or participate in promotions at ABC. '
                      }}
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </OutlineCard>
    </section>
  </Container>
</template>

<script lang="ts" setup>
import Container from '@/layout/Container.vue';
import OutlineCard from '@/components/OutlineCard.vue';
</script>

<style lang="scss" scoped>
.termsCard {
  box-sizing: border-box;
  max-width: 1280px;
  padding: 32px 40px;
  line-height: 20px;
  background-color: #323232;

  &__block {
    margin-top: 32px;
  }

  &__title {
    font-size: 26px;
    line-height: 26px;
    color: var(--primary-color);
  }

  &__content {
    margin-top: 32px;
  }
}

.termsList {
  color: #9e9e9e;
  &__item {
    text-align: justify;
    & + & {
      margin-top: 20px;
    }
  }

  &--dot {
    list-style: disc;
    padding-left: 24px;
    margin-top: 20px;
  }
}

.termLink {
  color: #99c2ec;
  text-decoration: underline;
}
</style>
