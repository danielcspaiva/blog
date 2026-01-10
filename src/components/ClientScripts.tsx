'use client';

import { useEffect } from 'react';

export default function ClientScripts() {
  useEffect(() => {
    // Animate elements on mount
    const animate = () => {
      const animateElements = document.querySelectorAll('.animate');
      animateElements.forEach((element, index) => {
        setTimeout(() => {
          element.classList.add('show');
        }, index * 100);
      });
    };

    // Handle scroll for back-to-top button
    const onScroll = () => {
      if (window.scrollY > 0) {
        document.documentElement.classList.add('scrolled');
      } else {
        document.documentElement.classList.remove('scrolled');
      }
    };

    // Add copy code buttons to code blocks
    const addCopyCodeButtons = () => {
      const copyButtonLabel = '📋';
      const codeBlocks = Array.from(document.querySelectorAll('pre'));

      const copyCode = async (codeBlock: HTMLElement, copyButton: HTMLButtonElement) => {
        const codeText = codeBlock.innerText;
        const buttonText = copyButton.innerText;
        const textToCopy = codeText.replace(buttonText, '');

        await navigator.clipboard.writeText(textToCopy);
        copyButton.innerText = '✅';

        setTimeout(() => {
          copyButton.innerText = copyButtonLabel;
        }, 2000);
      };

      for (const codeBlock of codeBlocks) {
        // Skip if button already exists
        if (codeBlock.querySelector('.copy-code')) continue;

        const wrapper = document.createElement('div');
        wrapper.style.position = 'relative';

        const copyButton = document.createElement('button');
        copyButton.innerText = copyButtonLabel;
        copyButton.classList.add('copy-code');

        codeBlock.setAttribute('tabindex', '0');
        codeBlock.appendChild(copyButton);

        if (codeBlock.parentNode) {
          codeBlock.parentNode.insertBefore(wrapper, codeBlock);
          wrapper.appendChild(codeBlock);
        }

        copyButton.addEventListener('click', async () => {
          await copyCode(codeBlock as HTMLElement, copyButton);
        });
      }
    };

    // Initialize
    animate();
    onScroll();
    addCopyCodeButtons();

    // Add scroll listener
    document.addEventListener('scroll', onScroll);

    return () => {
      document.removeEventListener('scroll', onScroll);
    };
  }, []);

  return null;
}
