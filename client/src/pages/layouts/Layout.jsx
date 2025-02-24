import SiteLayout from "./SiteLayout";
import UserPanelLayout from "./UserPanelLayout";

export const Layout = (Component, layout = 'site') => {
    const SelectedLayout = layout === 'site' ? SiteLayout : UserPanelLayout;

    return (props) => (
        <SelectedLayout>
            <Component {...props} />
        </SelectedLayout>
    );
};