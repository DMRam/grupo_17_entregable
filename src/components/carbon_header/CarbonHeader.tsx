import {
    Header,
    HeaderContainer,
    HeaderName,
    HeaderNavigation,
    HeaderMenuButton,
    HeaderMenuItem,
    HeaderGlobalBar,
    HeaderGlobalAction,
    SkipToContent,
    SideNav,
    SideNavItems,
    HeaderSideNavItems,
    SideNavMenuItem,
    Link,
    SideNavLinkText,
    SideNavDivider,
    SideNavHeader,
    SideNavMenu
} from '@carbon/react';
import { Switcher, Notification, UserAvatar, NonCertified, IntentRequestCreate } from '@carbon/icons-react';
import './carbon_header.scss'
import { useCreate } from '../../hooks/useCreate';
import { TabInfo } from '../../interfaces/UserInterface';
import { useState } from 'react';
import { useAuthentication } from '../../hooks/useAuthentication';
import { useNavigate } from 'react-router-dom';
// import { Link, useNavigate } from 'react-router-dom';
interface Props {
    name: string
}
export const CarbonHeader = ({ name }: Props) => {

    const { onCreateNewTab } = useCreate()
    const [isSideNavExpanded, setIsSideNavExpanded] = useState(false);
    const { isUserLoggedOut, onUserLoggingOut } = useAuthentication()
    const navigate = useNavigate()


    const onNewTab = (label: string) => {
        let panelBasedOnLabel = <></>; // Default empty panel

        const newTenantTab: TabInfo = {
            label,
            panel: panelBasedOnLabel,
            icon: () => <IntentRequestCreate />, // Use your icon component or an empty fragment
            disabled: false // or true based on your requirements
        };

        // Assuming onCreateNewTab is a function to handle tab creation in Redux
        onCreateNewTab(newTenantTab);
        setIsSideNavExpanded(!isSideNavExpanded);
    };


    const onLogout = () => {
        console.log("Sign out clicked");
        const email = localStorage.getItem('email');

        // Clear specific items related to authentication
        localStorage.removeItem('token'); // Assuming 'token' is the authentication token key
        localStorage.removeItem('email'); // Assuming 'user' is the user information key
        localStorage.removeItem('user'); // Assuming 'user' is the user information key

        // Remove the current page from session history and navigate to login
        window.history.replaceState(null, '', '/');
        navigate('/', { replace: true });

        // Reload the page to reflect the logged-out state
        window.location.reload();

        // Revoke access using Google API
        if (email) {
            window.google.accounts.id.revoke(email, (done: any) => {
                console.log("Google account revoked");
            });
        }

        // Make this true
        if (!isUserLoggedOut) {
            onUserLoggingOut(true);
        }

    }

    return (
        <HeaderContainer
            render={() => (
                <Header aria-label="Immobilier">
                    <SkipToContent />

                    <HeaderMenuButton
                        aria-label="Open menu"
                        isCollapsible
                        onClick={() => setIsSideNavExpanded(!isSideNavExpanded)}
                        isActive={isSideNavExpanded}
                    />
                    <HeaderName href="/" prefix="Immobilier">
                        {name}
                    </HeaderName>
                    <SideNav
                        aria-label="Side navigation"
                        expanded={isSideNavExpanded}
                        isPersistent={false}
                    >
                        <SideNavItems>

                            {/* <SideNavHeader ></SideNavHeader> */}
                            <div style={{ marginLeft: 15 }}>Immobilier  </div>
                            <SideNavDivider />

                            <SideNavMenu title={'Nuevo'}>
                                {/* <SideNavMenuItem onClick={() => { onNewTab('Nuevo Arriendo') }} >
                                    Nuevo Arriendo
                                </SideNavMenuItem> */}
                                <SideNavMenuItem onClick={() => { onNewTab('Nuevo Cliente') }} >
                                    Nuevo Propietario
                                </SideNavMenuItem>
                                {/* <SideNavMenuItem onClick={() => { onNewTab('Nueva Propiedad') }} >
                                    Nueva Propiedad
                                </SideNavMenuItem> */}
                                <SideNavMenuItem onClick={() => { onNewTab('Nuevo Arrendatario') }} >
                                    Nuevo Arrendatario
                                </SideNavMenuItem>
                                <SideNavDivider />

                            </SideNavMenu>
                            <SideNavMenuItem   >
                                Analítica
                            </SideNavMenuItem>

                            <SideNavMenuItem  >
                                Reportes
                            </SideNavMenuItem>

                            <SideNavMenuItem onClick={onLogout} >
                                Logout
                            </SideNavMenuItem>
                        </SideNavItems>

                    </SideNav>
                    <HeaderGlobalBar />
                    <HeaderGlobalBar>
                        <HeaderGlobalAction aria-label="Notifications" tooltipAlignment="center">
                            <Notification size={20} />
                        </HeaderGlobalAction>
                        <HeaderGlobalAction aria-label="User Avatar" tooltipAlignment="center">
                            <UserAvatar size={20} />
                        </HeaderGlobalAction>
                        <HeaderGlobalAction aria-label="App Switcher" tooltipAlignment="end">
                            <Switcher size={20} />
                        </HeaderGlobalAction>
                    </HeaderGlobalBar>

                </Header>
            )}
        />)
};
