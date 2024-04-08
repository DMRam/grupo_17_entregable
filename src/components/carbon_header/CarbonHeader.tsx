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
} from '@carbon/react';
import { Switcher, Notification, UserAvatar } from '@carbon/icons-react';
import { Link, useNavigate } from 'react-router-dom';
interface Props {
    name: string
}
export const CarbonHeader = ({ name }: Props) => (
    <HeaderContainer
        render={({ isSideNavExpanded, onClickSideNavExpand }) => (
            <Header aria-label="Immobilier">
                <SkipToContent />

                <HeaderMenuButton
                    aria-label="Open menu"
                    isCollapsible
                    onClick={onClickSideNavExpand}
                    isActive={isSideNavExpanded}
                />
                <HeaderName href="/" prefix="Immobilier">
                    {name}
                </HeaderName>
                <Link to="/dashboard">
                    <HeaderNavigation aria-label="Home">

                        <HeaderMenuItem>Home</HeaderMenuItem>

                    </HeaderNavigation>
                </Link>
                <Link to="/create_view">
                    <HeaderNavigation aria-label="Analytics">
                        <HeaderMenuItem href="/Analytics">Nuevo</HeaderMenuItem>
                    </HeaderNavigation>
                </Link>
                <Link to="/dashboard">
                    <HeaderNavigation aria-label="Analytics">
                        <HeaderMenuItem href="/Analytics">Analítica</HeaderMenuItem>
                    </HeaderNavigation>
                </Link>
                <Link to="/dashboard">
                    <HeaderNavigation aria-label="Reports">
                        <HeaderMenuItem href="/Reports">Reportes</HeaderMenuItem>
                    </HeaderNavigation>
                </Link>
                <Link to="/dashboard">
                    <HeaderNavigation aria-label="Logout">
                        <HeaderMenuItem href="/repos">Logout</HeaderMenuItem>
                    </HeaderNavigation>
                </Link>

                <SideNav
                    aria-label="Side navigation"
                    expanded={isSideNavExpanded}
                    isPersistent={false}
                >

                    <SideNavItems>
                        <SideNavMenuItem onClick={() => { }} >
                            About
                        </SideNavMenuItem>
                        <SideNavMenuItem onClick={() => { }} >
                            Services
                        </SideNavMenuItem>
                        <SideNavMenuItem onClick={() => { }} >
                            Contact
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
    />
);
