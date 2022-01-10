import { GetStaticPropsContext } from "next";

import Navbar, { NavbarProps } from "components/Navigation/Navbar";
import Footer, { FooterProps } from "components/Footer/Footer";
import { request } from "clients/datocms";
import { CmsData } from "models/datoCMS";
import { GET_PAGE_DATA_QUERY } from "graphql/queries/getPageData";
import { GET_ALL_PAGE_SLUGS_QUERY } from "graphql/queries/getAllPageSlugs";
import CmsComponentMapper from "components/CMS/CmsComponentMapper";

interface Props {
  data: CmsData;
}

const Page = ({
  data: {
    page: { navbar, footer, sections },
  },
}: Props) => {
  const renderNavbar = () => {
    const { socialMediaIcons, navigationLinks, callToActions } = navbar as NavbarProps;

    return (
      <Navbar
        socialMediaIcons={socialMediaIcons}
        navigationLinks={navigationLinks}
        callToActions={callToActions}
      />
    );
  };

  const renderFooter = () => {
    const { copyrightText, navigationLinks, socialMediaIcons } = footer as FooterProps;

    return (
      <Footer
        copyrightText={copyrightText}
        navigationLinks={navigationLinks}
        socialMediaIcons={socialMediaIcons}
      />
    );
  };

  return (
    <>
      {navbar && renderNavbar()}
      <main>
        {sections?.map(({ __typename, id, ...other }) => (
          <CmsComponentMapper key={id} typeName={__typename} componentProps={other} />
        ))}
      </main>
      {footer && renderFooter()}
    </>
  );
};

export async function getStaticProps(ctx: GetStaticPropsContext) {
  const currentSlug = ctx.params?.slug;

  const data = await request(GET_PAGE_DATA_QUERY, { slug: currentSlug });

  return {
    props: { data },
  };
}

export async function getStaticPaths() {
  const cmsData = await request(GET_ALL_PAGE_SLUGS_QUERY);

  const paths = cmsData.allPages.map((page: any) => ({ params: { slug: page.slug } }));

  return {
    fallback: false,
    paths,
  };
}

export default Page;
