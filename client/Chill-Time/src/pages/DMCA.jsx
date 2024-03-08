import Header from "../components/Header";

const DMCA = () => {
  return (
    <>
      <Header />
      <div className=" grid grid-cols-1 gap-8 absolute right-14 top-28">
        <h1 className="text-white text-4xl">DMCA</h1>
        <p className="text-white w-[1000px] text-xl">
          ChillTime لا يستضيف أي محتوى على خوادمه الخاصة؛ بل يقوم فقط بتوفير
          روابط أو تضمين محتوى تم تحميله على منصات الفيديو عبر الإنترنت الشهيرة.
          جميع العلامات التجارية، والفيديوهات، وأسماء الشركات التجارية، وعلامات
          الخدمة، والأعمال المحمية بحقوق النشر، والشعارات المُشار إليها هنا
          تنتمي إلى أصحابها/الشركات المعنية. ChillTime ليس مسؤولاً عن المحتوى
          الذي يُقوم المستخدمون بتحميله على مواقع الطرف الثالث. ننصح جميع مالكي
          حقوق النشر بالاعتراف بأن الروابط المُقدمة على هذا الموقع مُستمدة من
          مكان آخر على الويب، وأن الفيديوهات المضمنة مأخوذة من مواقع مختلفة
          أُشير إليها أعلاه. إذا كان لديك أي مخاوف قانونية، يرجى التواصل مع
          أصحاب الملفات الإعلامية/المُستضيفين المناسبين.
        </p>
        <p className="text-white w-[1000px] DMCAContent text-xl mr-[430px]">
          ChillTime doesn’t host any content on its own server; it merely
          provides links to or embeds content that has been uploaded to popular
          online video hosting platforms. All trademarks, videos, trade names,
          service marks, copyrighted work, and logos referenced herein belong to
          their respective owners/companies. ChillTime is not responsible
          for the content uploaded by users to third-party sites. We advise all
          copyright owners to acknowledge that the links provided on this site
          are sourced from elsewhere on the web, and any embedded videos are
          from various other sites as mentioned above. If you have any legal
          concerns, please contact the appropriate media file owners/hosters.
        </p>
        <h3 className="text-white text-4xl mr-[420px]">Best regards, ChillTime Administration</h3>
      </div>
    </>
  );
};

export default DMCA;
