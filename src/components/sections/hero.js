import React, { useState, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import styled from 'styled-components';
import { navDelay, loaderDelay } from '@utils';
import { usePrefersReducedMotion } from '@hooks';

const StyledHeroSection = styled.section`
  ${({ theme }) => theme.mixins.flexCenter};
  flex-direction: column;
  align-items: flex-start;
  min-height: 100vh;
  height: 100vh;
  padding: 0;

  @media (max-height: 700px) and (min-width: 700px), (max-width: 360px) {
    height: auto;
    padding-top: var(--nav-height);
  }

  h1 {
    margin: 0 0 30px 4px;
    color: var(--green);
    font-family: var(--font-mono);
    font-size: clamp(var(--fz-sm), 5vw, var(--fz-md));
    font-weight: 400;

    @media (max-width: 480px) {
      margin: 0 0 20px 2px;
    }
  }

  h3 {
    margin-top: 5px;
    color: var(--slate);
    line-height: 0.9;
  }

  p {
    margin: 20px 0 0;
    max-width: 540px;
  }

  .email-link {
    ${({ theme }) => theme.mixins.bigButton};
    margin-top: 50px;
  }
`;

const Hero = () => {
  const [isMounted, setIsMounted] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    const timeout = setTimeout(() => setIsMounted(true), navDelay);
    return () => clearTimeout(timeout);
  }, []);

  // ==================== 🛠️ 在下方修改你的个人信息 ====================

  // 1. 最顶部的打招呼（可以用英文，也可以改中文比如 <h1>你好，我是</h1>）
  const one = <h1>Hi, my name is</h1>;

  // 2. 你的名字（大标题）
  const two = <h2 className="big-heading">I‘m Urian.</h2>;

  // 3. 一句话职业定位（第二大标题）
  const three = <h3 className="big-heading">你好！我是一名横跨前端开发与音频技术/音乐制作的数字化创作者。</h3>;

  // 4. 你的简短自我介绍
  const four = (
    <>
      <p>
        
      </p>
    </>
  );

  // 5. 最显眼的互动按钮（这里改成了点击直接触发给你发邮件）
  const five = (
    <a
      className="email-link"
      href="mailto:dark.alpaca0.0@gmail.com"
      target="_blank"
      rel="noreferrer">
      联系我 / Get In Touch
    </a>
  );

  // =================================================================

  const items = [one, two, three, four, five];

  return (
    <StyledHeroSection>
      {prefersReducedMotion ? (
        <>
          {items.map((item, i) => (
            <div key={i}>{item}</div>
          ))}
        </>
      ) : (
        <TransitionGroup component={null}>
          {isMounted &&
            items.map((item, i) => (
              <CSSTransition key={i} classNames="fadeup" timeout={loaderDelay}>
                <div style={{ transitionDelay: `${i + 1}00ms` }}>{item}</div>
              </CSSTransition>
            ))}
        </TransitionGroup>
      )}
    </StyledHeroSection>
  );
};

export default Hero;