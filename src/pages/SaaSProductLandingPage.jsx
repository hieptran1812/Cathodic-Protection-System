import React from "react";
import tw from "twin.macro";
import { css } from "styled-components/macro"; //eslint-disable-line
import AnimationRevealPage from "../helpers/AnimationRevealPage.js";
import Hero from "../components/hero/TwoColumnWithInput.js";
import Features from "../components/features/ThreeColWithSideImage.js";
import MainFeature2 from "../components/features/TwoColWithTwoHorizontalFeaturesAndButton.js";
import FeatureWithSteps from "../components/features/TwoColWithSteps.js";
import FAQ from "../components/faqs/SingleCol.js";
import macHeroScreenshotImageSrc from "../images/anh2.gif";
import prototypeIllustrationImageSrc from "../images/anh4.gif";
import { ReactComponent as BriefcaseIcon } from "feather-icons/dist/icons/briefcase.svg";
import { ReactComponent as MoneyIcon } from "feather-icons/dist/icons/dollar-sign.svg";

export default function LandingPage() {
  const Subheading = tw.span`uppercase tracking-widest font-bold text-gray-500`;
  const HighlightedText = tw.span`text-gray-500`;

  return (
    <AnimationRevealPage id = "feature">
      <Hero roundedHeaderButton={true} />
      <Features
        subheading={<Subheading>Tính năng</Subheading>}
        heading={
          <>
            Dịch vụ <HighlightedText>thông minh</HighlightedText>
          </>
        }
      />
      <FeatureWithSteps
        subheading={<Subheading>Tiện lợi</Subheading>}
        heading={
          <>
            Sử dụng <HighlightedText>dễ dàng</HighlightedText>
          </>
        }
        textOnLeft={false}
        imageSrc={macHeroScreenshotImageSrc}
        imageDecoratorBlob={true}
        decoratorBlobCss={tw`xl:w-40 xl:h-40 opacity-25 -translate-x-1/2 left-1/2`}
      />
      <MainFeature2
        subheading={<Subheading>Giá trị</Subheading>}
        heading={
          <>
            Quản lý <HighlightedText>tiện lợi</HighlightedText>
          </>
        }
        imageSrc={prototypeIllustrationImageSrc}
        showDecoratorBlob={false}
        features={[
          {
            Icon: MoneyIcon,
            title: "Tối ưu",
            description: "Tối ưu chi phí quản lý thiết bị",
            iconContainerCss: tw`bg-green-300 text-green-800`,
          },
          {
            Icon: BriefcaseIcon,
            title: "Chuyên nghiệp",
            description: "Hệ thống được xây dựng chuyên nghiệp",
            iconContainerCss: tw`bg-red-300 text-red-800`,
          },
        ]}
      />
      <FAQ
        subheading={<Subheading>FAQS</Subheading>}
        heading={
          <>
            <HighlightedText>Câu hỏi thường gặp</HighlightedText>
          </>
        }
        faqs={[
          {
            question: "Dữ liệu có realtime hay không?",
            answer:
              "Dữ liệu trên hệ thống được hiển thị realtime theo các thông số trên thiết bị đo.",
          },
          {
            question: "Làm như nào tôi có thể sử dụng hệ thống này?",
            answer:
              "Bạn cần liên hệ với tổ chức liên quan để được cấp tài khoản sử dụng.",
          },
          {
            question: "Làm như nào để thêm một thiết bị với vị trí đặt cụ thể?",
            answer:
              "Bạn sử dụng google map để tìm hai thông số là kinh độ và vĩ độ của vị trí đặt thiết bị, sau đó copy và gán thông tin vào phần thêm thiết bị trên hệ thống.",
          },
        ]}
      />
    </AnimationRevealPage>
  );
}
