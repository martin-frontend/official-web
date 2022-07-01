<template>
  <Container>
    <section>
      <OutlineCard>
        <div class="termsCard">
          <div class="termsCard__block">
            <div class="termsCard__title">
              {{ 'Responsible Gaming terms ' }}
            </div>
            <div class="termsCard__content">
              <ul class="termsList">
                <li class="termsList__item">
                  <span>
                    {{
                      '35.1 For those customers who wish to restrict their gambling, we provide a voluntary self-exclusion policy, which enables You to close Your Account or restrict Your ability to place bets or game on the Website for a minimum period of six months. Once Your Account has been self-excluded You will be unable to reactivate the Account under any circumstances until the expiry of the period chosen under this paragraph. At the expiry of the self-exclusion period You will be entitled to re-commence use of the Services by contacting '
                    }}
                  </span>
                  <a
                    href="https://support.abc.com/hc/en-us"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="termLink"
                  >
                    {{ 'support@abc.com' }}
                  </a>
                </li>
                <li class="termsList__item">
                  {{
                    '35.2 In case you are concerned about your gambling practices there are a number of guidelines you may find useful: '
                  }}
                  <ul class="termsList termsList--dot">
                    <li class="termsList__item">
                      {{
                        '35.2.1 try and establish limits for the amounts you want to wager or deposit. '
                      }}
                    </li>
                    <li>
                      {{
                        '35.2.2 consider how long you wish any wagering session to last before commencing and be sure to keep an eye on the clock. '
                      }}
                    </li>
                    <li>
                      {{
                        '35.2.3 try not to let gambling interfere with your daily responsibilities.  '
                      }}
                    </li>
                  </ul>
                </li>
                <li class="termsList__item">
                  {{
                    '35.3 Mind that gambling is not advised if you are recovering for any form of dependency or if you are under the influence of alcohol or any other substance including some prescription medication.  '
                  }}
                </li>
                <li class="termsList__item">
                  {{
                    '35.4 You should always be aware, that gambling is a form of recreation and should not be viewed as an alternative source of income or a way to recoup debt. Recognising that you may be developing a gambling problem is the first step to regaining control. '
                  }}
                </li>
                <li class="termsList__item">
                  {{ '35.5 Please bear in mind, that: ' }}
                  <ul class="termsList termsList--dot">
                    <li class="termsList__item">
                      {{
                        '35.5.1 Gambling should be entertaining and not seen as a way of making money. '
                      }}
                    </li>
                    <li>
                      {{ '35.5.2 you should avoid chasing losses. ' }}
                    </li>
                    <li>
                      {{ '35.5.3 Only gamble what you can afford to lose.  ' }}
                    </li>
                    <li>
                      {{
                        '35.5.4 Keep track of time and the amount you spend gambling.  '
                      }}
                    </li>
                  </ul>
                </li>
                <li class="termsList__item">
                  <span>
                    {{
                      '35.6 If You require any information relating to this contact our Support '
                    }}
                  </span>
                  <a
                    href="https://support.abc.com/hc/en-us"
                    rel="noopener noreferrer"
                    target="_blank"
                    class="termLink"
                  >
                    {{ 'support@abc.com' }}
                  </a>
                  <span>
                    {{ ' or view our Responsible Gambling section.' }}
                  </span>
                </li>
                <li class="termsList__item">
                  <span>
                    {{
                      '35.7 The Operator is committed to supporting Responsible Gambling initiatives. We suggest to visit '
                    }}
                  </span>
                  <a
                    href="https://www.responsiblegambling.org"
                    rel="noopener noreferrer"
                    target="_blank"
                    class="termLink"
                  >
                    {{ 'www.responsiblegambling.org' }}
                  </a>
                  <span>
                    {{
                      ' for further help, if you feel that gambling starts to become a problem for you.'
                    }}
                  </span>
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
