

import * as ScrollMagic from 'scrollmagic'; // Or use scrollmagic-with-ssr to avoid server rendering problems
import { TweenMax, TimelineMax } from 'gsap'; // Also works with TweenLite and TimelineLite
import { ScrollMagicPluginGsap } from 'scrollmagic-plugin-gsap';

// eslint-disable-next-line new-cap
ScrollMagicPluginGsap(ScrollMagic, TweenMax, TimelineMax);

export default class SceneFactory {

	createScene(settings, scrollParent) {

        const scene = new ScrollMagic.Scene({
            triggerElement: settings.triggerElement,
            duration: settings.duration, 
			offset: settings.offset,
            triggerHook: settings.triggerHook
            //triggerHook: 0
        })
		.setTween(settings.setTween)
        //.setPin( '.ck-site')
		.addTo(settings.addTo)
		.setClassToggle( settings.triggerElement, 'visible');

		scrollParent.options.scenes.push(scene);

		return scene;
	}
}
