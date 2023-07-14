import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Card, Rarity, Subtype } from 'pokemon-tcg-sdk-typescript/dist/sdk';

import { altArts } from '../../utils/alternate-arts';
import { isDefined } from '../../utils/func';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent implements OnInit, OnChanges {
  @Input() item!: Card;

  public foil = '';
  public mask = '';

  // private springInteractSettings = { stiffness: 0.066, damping: 0.25 };
  // private springPopoverSettings = { stiffness: 0.033, damping: 0.45 };
  // private springRotate = spring({ x: 0, y: 0 }, springInteractSettings);
  // private springGlare = spring({ x: 50, y: 50, o: 0 }, springInteractSettings);
  // private springBackground = spring({ x: 50, y: 50 }, springInteractSettings);
  // private springRotateDelta = spring({ x: 0, y: 0 }, springPopoverSettings);
  // private springTranslate = spring({ x: 0, y: 0 }, springPopoverSettings);
  // private springScale = spring(1, springPopoverSettings);

  public interact(e: any) {
    // endShowcase();

    // if (!isVisible) {
    //   return (interacting = false);
    // }

    // // prevent other background cards being interacted with
    // if ($activeCard && $activeCard !== thisCard) {
    //   return (interacting = false);
    // }

    // interacting = true;

    if (e.type === 'touchmove') {
      e.clientX = e.touches[0].clientX;
      e.clientY = e.touches[0].clientY;
    }

    // const $el = e.target;
    // const rect = $el.getBoundingClientRect(); // get element's current size/position
    // const absolute = {
    //   x: e.clientX - rect.left, // get mouse position from left
    //   y: e.clientY - rect.top, // get mouse position from right
    // };
    // const percent = {
    //   x: clamp(round((100 / rect.width) * absolute.x)),
    //   y: clamp(round((100 / rect.height) * absolute.y)),
    // };
    // const center = {
    //   x: percent.x - 50,
    //   y: percent.y - 50,
    // };

    // updateSprings(
    //   {
    //     x: adjust(percent.x, 0, 100, 37, 63),
    //     y: adjust(percent.y, 0, 100, 33, 67),
    //   },
    //   {
    //     x: round(-(center.x / 3.5)),
    //     y: round(center.y / 2),
    //   },
    //   {
    //     x: round(percent.x),
    //     y: round(percent.y),
    //     o: 1,
    //   }
    // );
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['item']) {
      let id = this.item.id;
      let name = this.item.name;
      let number = this.item.number;
      let set = this.item.set;
      let types = this.item.types;
      let subtypes = this.item.subtypes;
      let supertype = this.item.supertype;
      let rarity = this.item.rarity;
      let isReverse = false;

      // image props
      // let img = this.item.images;
      // let back = '';
      // let foil = '';
      // let mask = '';

      const isShiny =
        isDefined(number) && number.toLowerCase().startsWith('sv');
      /**
        Trainer / Galar Gallery Card (not shiny)
        */
      const isGallery = isDefined(number) && !!number.match(/^[tg]g/i);
      /**
        Alternate Art Card (not shiny / gallery)
        */
      const isAlternate =
        isDefined(id) && altArts.includes(id) && !isShiny && !isGallery;
      /**
        Promo Card
        */
      // const isPromo = isDefined(set) && typeof set === "string" && set === "swshp";

      if (isReverse) {
        rarity = (rarity + ' Reverse Holo') as Rarity;
      }

      if (isGallery) {
        if (isDefined(rarity) && rarity.startsWith('Trainer Gallery')) {
          rarity = rarity.replace(/Trainer Gallery\s*/, '') as Rarity;
        }
        if (
          isDefined(rarity) &&
          rarity.includes('Rare Holo V') &&
          isDefined(subtypes) &&
          subtypes.includes(Subtype.VMax)
        ) {
          rarity = Rarity.RareHoloVMAX;
        }
        // if ( isDefined(rarity) && rarity.includes( "Rare Holo V" ) && isDefined(subtypes) && subtypes.includes(Subtype.S) ) {
        //   rarity = "Rare Holo VSTAR";
        // }
      }

      const foilMaskImage = (type = 'masks') => {
        let etch = 'holo';
        let style = 'reverse';
        let ext = 'webp';

        // if (isDefined(prop)) {
        //   if (prop === false) {
        //     return '';
        //   }
        //   return prop;
        // }

        if (
          !isDefined(rarity) ||
          !isDefined(subtypes) ||
          !isDefined(supertype) ||
          !isDefined(set) ||
          !isDefined(number)
        ) {
          return '';
        }

        const fRarity = rarity.toLowerCase();
        const fNumber = number
          .toString()
          .toLowerCase()
          .replace('swsh', '')
          .padStart(3, '0');
        const fSet = set.id
          .toString()
          .toLowerCase()
          .replace(/(tg|gg|sv)/, '');

        if (fRarity === 'rare holo') {
          style = 'swholo';
        }

        if (fRarity === 'rare holo cosmos') {
          style = 'cosmos';
        }

        if (fRarity === 'radiant rare') {
          etch = 'etched';
          style = 'radiantholo';
        }

        if (
          fRarity === 'rare holo v' ||
          fRarity === 'rare holo vunion' ||
          fRarity === 'basic v'
        ) {
          etch = 'holo';
          style = 'sunpillar';
        }

        if (
          fRarity === 'rare holo vmax' ||
          fRarity === 'rare ultra' ||
          fRarity === 'rare holo vstar'
        ) {
          etch = 'etched';
          style = 'sunpillar';
        }

        if (
          fRarity === 'amazing rare' ||
          fRarity === 'rare rainbow' ||
          fRarity === 'rare secret'
        ) {
          etch = 'etched';
          style = 'swsecret';
        }

        if (isShiny) {
          etch = 'etched';
          style = 'sunpillar';

          // if ( fRarity === "rare shiny v" || (fRarity === "rare holo v" && fNumber.startsWith( "sv" )) ) {
          //   rarity =  "Rare Shiny V";
          // }

          // if ( fRarity === "rare shiny vmax" || (fRarity === "rare holo vmax" && fNumber.startsWith( "sv" )) ) {
          //   style = "swsecret";
          //   rarity = "Rare Shiny VMAX";
          // }
        }

        if (isGallery) {
          etch = 'holo';
          style = 'rainbow';

          if (
            fRarity.includes('rare holo v') ||
            fRarity.includes('rare ultra')
          ) {
            etch = 'etched';
            style = 'sunpillar';
          }

          if (fRarity.includes('rare secret')) {
            etch = 'etched';
            style = 'swsecret';
          }
        }

        if (isAlternate) {
          etch = 'etched';

          if (subtypes.includes(Subtype.VMax)) {
            style = 'swsecret';
            // rarity = "Rare Rainbow Alt";
          } else {
            style = 'sunpillar';
          }
        }

        // if ( isPromo ) {

        //   let promoStyle = promos[ id ];
        //   if ( promoStyle ) {
        //     style = promoStyle.style.toLowerCase();
        //     etch = promoStyle.etch.toLowerCase();
        //     if ( style === "swholo" ) {
        //       rarity = "Rare Holo";
        //     } else if ( style === "cosmos" ) {
        //       rarity = "Rare Holo Cosmos";
        //     }
        //   }

        // }

        return `https://poke-holo.b-cdn.net/foils/${fSet}/${type}/upscaled/${fNumber}_foil_${etch}_${style}_2x.${ext}`;
      };

      this.foil = foilMaskImage('foils');
      this.mask = foilMaskImage('masks');
      console.log(this.foil, this.mask);
    }
  }

  ngOnInit(): void {}

  // private updateSprings( background, rotate, glare ) {

  //   springBackground.stiffness = springInteractSettings.stiffness;
  //   springBackground.damping = springInteractSettings.damping;
  //   springRotate.stiffness = springInteractSettings.stiffness;
  //   springRotate.damping = springInteractSettings.damping;
  //   springGlare.stiffness = springInteractSettings.stiffness;
  //   springGlare.damping = springInteractSettings.damping;

  //   springBackground.set(background);
  //   springRotate.set(rotate);
  //   springGlare.set(glare);

  // }
}
