roy-gbiv
========

Adventures in colorhood


Color Math
========

RYB =/= RGB

In a traditional RYB color wheel (the kind we all grew up with in elementary school), the colors are positioned as such:

Red       - 0º
Orange    - 60º
Yellow    - 120º
Green     - 180º
BLue      - 240º
Violet    - 300º

This maintains the understanding that the primary colors are red, yellow, and blue (positioned equidistant at 0º, 120º, and 240º); the complimentary sets are red and green, yellow and violet, and blue and orange. Unfortunately this is not the same color system that our screens use; RGB.

In an RGB color wheel (the kind we all work with today), the colors are positioned as such:

Red       - 0º
Yellow    - 60º
Green     - 120º
Teal/Cyan - 180º
Blue      - 240º
Magenta   - 300º

There are some differences here. Most obviously, our primary colors are now red, GREEN, and blue. This directly effects the rest of the color wheel and all of the palettes created using a color's relationship to another on the wheel. For example, the compliment to red is no longer green, it's cyan. The compliment to yellow is now blue and the compliment to green is magenta.

Some people think these combinations are more pleasing to the eye and/or they're more accurate. These are the same people who think that Episode I's SFX was more pleasing to the eye and/or it should be pronounced "JIF" because it's more accurate. Heathens.

Because of the differences between RYB and RGB there are some colors that are listed as primary/secondary on one wheel and completely absent on another and since we're trying to modify an RGB wheel to match RYB, we'll insert the missing colors into the RGB wheel instead of the other way around. Orange on our RYB wheel lives between red and yellow on our RGB wheel and violet on RYB lives between blue and magenta on RGB. You'll have to trust us on this.

This gives us a RGB wheel that looks like this:

Red       - 0º
Orange    - 30º
Yellow    - 60º
Green     - 120º
Teal/Cyan - 180º
Blue      - 240º
Violet    - 270º
Magenta   - 300º

What we want is an RGB wheel that mimics an RYB wheel, more like this:

Red       - 0º
Orange    - 60º
Yellow    - 120º
Green     - 180º
Teal/Cyan - 210º
Blue      - 240º
Violet    - 300º
Magenta   - 330º

Unfortunately we can't use the RYB system in an RGB environment, but we can trick RGB into thinking it is RYB. What we have to do is re-map the location of our primary (and some secondary) colors on our RGB color wheel to match our more familiar RYB color wheel.

Constantly using the terms RGB and RYB is confusing. Let's call them Gerald and Yancy from now on.

The best way to equate this shift in position on our color wheel is to think of our primary and secondary colors as keyframes in a video file, we define the key points and let the rest sort itself out in between. If we move two keyframes closer together we are compressing the timeline and speeding up the transition between those two points. Move them apart and we do the opposite. Thankfully in both cases red is at 0º, this is our first keyframe.

Next we need to get green in it's correct place, so we take it from 120º on our Gerald wheel and move it to 180º on our Yancy wheel. This has the effect of expanding everything from 0º to 120º and compressing everything from 120º and 360º on our Gerald wheel. Our Gerald colors are now positioned as such:

Red       - 0º
Orange    - 45º
Yellow    - 90º
Green     - 180º
Teal/Cyan - 225º
Blue      - 270º
Violet    - 292.5º
Magenta   - 315º

Closer to Yancy, this is good. These are our new working numbers.

Let's get yellow to where it belongs and get the first half of our wheel sorted out. If we push our yellow keyframe to the 120º mark we need it to be at, this will expand everything between 0º and 90º and compress everything between 90º and 180º. This puts orange right where it needs to be and reduces the transition from yellow to green. So now red, orange, yellow, and green are all where they need to be, 0º, 60º, 120º, and 180º respectively.

So lets look at our change factors on our Gerald wheel.

Yellow was at 60º, it's now at 120º. Thats a change of *2.
Green was at 120º, it's now at 180º. Thats a change of *1.5.

What this tells us is that

// This is about the time that my new MacBook showed up and I was distracted by it's sexiness
