---
toc: true
comments: true
layout: post
title: Katelyn's Individual Review
subtitle: Katelyn Gelle
cover-img: /images/swordplaylink.gif
description: My individual review of what I've been doing these past few weeks!
type: plans
courses: { csse: {week: 11} }
categories: [C1.4]
---

<div style="text-align: center; margin-top: 20px; margin-bottom: 20px;">
  <img src="{{site.baseurl}}/images/thislifelink.gif" alt="Link, The Legend of Zelda: Tears of the Kingdom" />
</div>  

## Issues

During the project, I used issues sparingly. Most of my progress is documented in my own blog, which I have been updating daily with my progress. The documentation begins on Day 30 in the Week 7 blog and continues onward into Week 11. It's incredible to think that it's already been four weeks; time really does fly!

Anyway, here are our [issues](https://github.com/Gabriel-Gravin/Teamwork/issues). I only have one so far as of October 30th, 2023, but I'll probably add another one so I can talk about making the minigame and describing the process it took our group to implement everything we learned from our mini-projects into the main game.

Summary of what I've talked about and would like to talk about in my issues:
- Background and platform changes. I played around a lot with these so I could find a style that suits the game; I didn't want it to be too difficult and have platforms spawn at a sporadic rate while the background scrolled on too fast. I also didn't want it to be too easy. In summary, I made the scroll speed and platform spawn placement/spawn rate fairly generous while also upping the player's fall speed and removing their ability to run in midair without falling.
- Group work. As a group, we all set mini-goals that we eventually put into the main game. We have several minigames available on our blog that all ended up contributing to the big project. For example, there is a freeplay minigame available where I drafted Link's movement and animations; he originally used the arrow pad and space bar. Daisy also created minigames where she could test collisions. Gabriel illustrated and programmed the scrolling background, and Kaden implemented WASD controls into the sprite movement. We combined all of these into the final game, and all of our contributions can be seen in the result.
- Sprite movement. Link's movement started out as mere animations that played when selecting their corresponding buttons. We then moved on into putting him in the minigame, where he used the arrow pad and space bar to move and jump. There were some problems at first; for example, he would randomly disappear when jumping. These turned out to be due to an incorrect image sequence. We then evolved the movement so that he could use the WASD controls to move, which were more convenient because they can be used with one hand; the original movement required two hands to be truly convenient.  

## Overview of game controls  

The game controls are very simple; A to move left, D to move right, and W to jump. I guess you could say it's more WAD than WASD because the "S" key is never actually used. Hmm.  

![WASD event listeners]({{site.baseurl}}/images/wasd.png)  

Above, you can see how we used event listeners to implement the WASD movement.  

```
function updateSpriteAnimation() {
    if (frameX < maxFrame) {
        frameX++;
    } else {
        frameX = 0;
    }
}

function jump() {
    if (!isJumping && isOnGround) {
        spriteVelocityY = jumpStrength;
        isJumping = true;
        isOnGround = false;
    }
}

function moveLeft() {
    isMovingLeft = true;
    isIdle = false;
    frameY = 5;
    maxFrame = 9;
}

function moveRight() {
    isMovingRight = true;
    isIdle = false;
    frameY = 7;
    maxFrame = 9;
}

function idle() {
    isIdle = true;
    frameY = 0;
    maxFrame = 2;
}
```  

Above, you can see the code that we used to call the sprite animations according to the player's movement at that point in time. The frames are named according to the spritesheet provided below:  

![Link Spritesheet]({{site.baseurl}}/images/linksprites.png)  

## Overview of platform spawnpoints  

The platforms in the beginning of the game used to spawn extremely frequently and all around the screen; if the player abandoned the game for some time, this would result in the screen completely filling up with platforms. I have changed it since; now, there will always be a platform within jump range of the player so that they don't fall, but they don't spawn too close or too quickly. I used tracking mechanisms so that the platform knows not to spawn too close to the player and I also increased the seconds between each platform spawn so that there aren't too many spawning at a time.