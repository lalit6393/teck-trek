import React from "react";
import RuleStyle from "./style.module.css";

const RulesPage = () => {
  return (
    <div className={RuleStyle.outermostDiv}>
      <div className={RuleStyle.innermostDiv}>
        <div className={RuleStyle.mainHeading}>Rules</div>
        <div className={RuleStyle.MainContent}>
          <span className={RuleStyle.para}>
            1. This is an Online event which will be live from 5th April 2022
            and will last for three days 5th April 2022 to 7th April 2022.
          </span>

          <span className={RuleStyle.para}>
            2. Each question will bring you closer to your destination.
          </span>
          <span className={RuleStyle.para}>
            3. Each level will take you to the two paths. One of which is going
            to be the technical one and other non-technical one.
          </span>
          <span className={RuleStyle.para}>
            4. The Technical answer will earn you 10 points and the
            Non-Technical will earn you 5 points.
          </span>
          <span className={RuleStyle.para}>
            5. The answers are to be written only in lowercase. Special symbols
            and spaces are not allowed. Example : If an answer is “christopher
            nolan” submit it as “christophernolan” without any special character
            .
          </span>
          <span className={RuleStyle.para}>
            6. There may be some waiting time in between the questions. Try to
            be patient !
          </span>
          <span className={RuleStyle.para}>
            7. No backtracking is allowed i.e, if your answer is accepted for
            particular question then you cannot revert back to the same question
            again.
          </span>
          <span className={RuleStyle.para}>
            8. The hints to each level will be posted on the facebook page of
            NIBBLE COMPUTER SOCIETY. ( Please do not message personally on the
            page or anybody related to NCS regarding hints. Every possible hint
            for each level will be displayed on the page itself. )
          </span>
          <span className={RuleStyle.para}>
            9. In case of any discrepency, the judgement of Nibble Computer
            Society will be final.
          </span>
          <span className={RuleStyle.para}>
            10. The winner will be announced on the Instagram and the Facebook
            page as well, after the game terminates.
          </span>
          <span className={RuleStyle.para}>
            11. In recognition of an outstanding achievement, the top 5 winners
            will be rewarded with exciting goodies and the winners of first and
            second year will also be given a chance to sit directly in the
            second round of the NCS recruitment session .
          </span>
        </div>
      </div>
    </div>
  );
};

export default RulesPage;
