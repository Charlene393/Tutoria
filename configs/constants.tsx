//@ts-ignore
import One from "@/assets/images/onboarding/1.png"
//@ts-ignore
import Two from "@/assets/images/onboarding/2.png"
//@ts-ignore
import Three from "@/assets/images/onboarding/3.png"
import { IsIPAD } from "@/themes/app.constant"
import { Dimensions, Image } from "react-native"
import { verticalScale } from "react-native-size-matters"
export const onBoardingSlides: OnboardingSlidesTypes[] = [
    {
        color: "#40E0D0",
        title: "Explore",
        image: (
            <Image
                source={One}
                style={{
                    width: IsIPAD ? verticalScale(285) : verticalScale(320),
                    height: IsIPAD ? verticalScale(345) : verticalScale(330),
                }} />
        ),
        secondTitle: "Our Community",
        subtitle: "Find the Perfect Tutor for You",
    },
    {
        color: "#A7F893",
        title: "Explore",
        image: (
            <Image
                source={Two}
                style={{
                    width: IsIPAD ? verticalScale(285) : verticalScale(320),
                    height: IsIPAD ? verticalScale(345) : verticalScale(330),
                }} />
        ),
        secondTitle: "Our Goal",
        subtitle: "Achieve Your Learning Goals",
    },
  {
    color: "#FFC0CB",
    image: (
      <Image
        source={Three}
        style={{
          width: IsIPAD ? verticalScale(285) : verticalScale(320),
          height: IsIPAD ? verticalScale(345) : verticalScale(330),
        }}
      />
    ),
        title: "Archieve",
        secondTitle: "Your Final Goal",
        subtitle:
          "After your tutoring journey,celebrate your accomplishment!",
  },
]

//ONBOARDING VARIABLES
export enum Side{
    LEFT,
    RIGHT,
    NONE
}
export const MIN_LEDGE = 25;
export const {width: WIDTH, height: HEIGHT} = Dimensions.get('screen');
export const MARGIN_WIDTH = MIN_LEDGE + 50;
export const PREV = WIDTH;
export const NEXT = 0;
export const LEFT_SNAP_POINTS = [MARGIN_WIDTH, PREV];
export const RIGHT_SNAP_POINTS = [NEXT, WIDTH - MARGIN_WIDTH];