import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import BarChartIcon from '@mui/icons-material/BarChart';
import DescriptionIcon from '@mui/icons-material/Description';
import LayersIcon from '@mui/icons-material/Layers';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import type { Router, Navigation } from '@toolpad/core';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ApiIcon from '@mui/icons-material/Api';
import { Paper, List, ListItem, ListItemButton, ListItemText, ListItemIcon } from '@mui/material';
import ApiChart from '../componets/ApiChart';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
interface Api {
    id: number;
    name: string;
    url: string;
}

const NAVIGATION: Navigation = [
    {
        kind: 'header',
        title: 'Main items',
    },
    {
        segment: 'dashboard',
        title: 'Dashboard',
        icon: <DashboardIcon />,
    },
    {
        segment: 'orders',
        title: 'Orders',
        icon: <ShoppingCartIcon />,
    },
    {
        kind: 'divider',
    },
    {
        kind: 'header',
        title: 'Analytics',
    },
    {
        segment: 'reports',
        title: 'Reports',
        icon: <BarChartIcon />,
        children: [
            {
                segment: 'sales',
                title: 'Sales',
                icon: <DescriptionIcon />,
            },
            {
                segment: 'traffic',
                title: 'Traffic',
                icon: <DescriptionIcon />,
            },
        ],
    },
    {
        segment: 'integrations',
        title: 'Integrations',
        icon: <LayersIcon />,
    },
];

// Mock API data
const APIS: Api[] = [
    { id: 1, name: 'API 1', url: 'https://httpbin.org/get' },
    { id: 2, name: 'API 2', url: 'https://jsonplaceholder.typicode.com/posts' },
    // Add more APIs here
];

function ApiList({ onApiClick }: { onApiClick: (id: number) => void }) {
    return (
        <Paper sx={{ width: '100%', p: 2, boxShadow: 3 }}>
            <List sx={{ p: 0 }}>
                {APIS.map((api) => (
                    <ListItem
                        key={api.id}
                        disablePadding
                        sx={{
                            borderBottom: '1px solid #e0e0e0',
                            transition: 'background-color 0.3s ease',
                        }}
                    >
                        <ListItemButton
                            onClick={() => onApiClick(api.id)}
                            sx={{ p: 2 }}
                        >
                            <ListItemIcon>
                                <ApiIcon />
                            </ListItemIcon>
                            <ListItemText
                                primary={<Typography variant="h6">{api.name}</Typography>}
                                secondary={<Typography variant="body2" color="textSecondary">{api.url}</Typography>}
                            />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Paper>
    );
}

function ApiDetail({ apiId, onBack }: { apiId: number; onBack: () => void }) {
    const api = APIS.find((api) => api.id === apiId);

    if (!api) {
        return <Typography>API not found</Typography>;
    }

    return (
        <Paper sx={{ width: '100%', p: 2, position: 'relative' }}>
            <Box sx={{ position: 'absolute', top: 16, left: 16, mb: 3 }}>
                <ArrowBackIosNewIcon onClick={onBack} sx={{
                    fontSize: 24,
                    color: 'gray', 
                    cursor: 'pointer',
                    transition: 'color 0.3s ease',
                    '&:hover': {
                        color: 'indigo',
                    },
                    '&:active': {
                        transform: 'scale(0.9)',
                    },
                }} />
            </Box>
            <Box sx={{ mt: 10 }}>
                <ApiChart apiId={api.id} />
            </Box>
        </Paper>
    );
}
const DashboardSection = ({ selectedApiId, handleApiClick, handleBack }: any) => {
    return (<Box
        sx={{
            py: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
        }}
    >
        {selectedApiId ? (
            <ApiDetail apiId={selectedApiId} onBack={handleBack} />
        ) : (
            <ApiList onApiClick={handleApiClick} />
        )}
    </Box>);
}

function DemoPageContent({ pathname }: { pathname: string }) {
    const [selectedApiId, setSelectedApiId] = React.useState<number | null>(null);

    const handleApiClick = (id: number) => {
        setSelectedApiId(id);
    };

    const handleBack = () => {
        setSelectedApiId(null);
    };

    return (
        <>
            {pathname == `/dashboard` ? (
                <DashboardSection
                    selectedApiId={selectedApiId}
                    handleApiClick={handleApiClick}
                    handleBack={handleBack}
                />
            ) : <></>}
            {pathname == `/orders` ? (
                <DashboardSection
                    selectedApiId={selectedApiId}
                    handleApiClick={handleApiClick}
                    handleBack={handleBack}
                />
            ) : <></>}
        </>
    );
}

interface DemoProps {
    window?: () => Window;
}

export default function DashboardLayoutBasic(props: DemoProps) {
    const { window } = props;

    const [pathname, setPathname] = React.useState<string>('/dashboard');

    const router = React.useMemo<Router>(() => {
        return {
            pathname,
            searchParams: new URLSearchParams(),
            navigate: (path) => setPathname(String(path)),
        };
    }, [pathname]);

    // Remove this const when copying and pasting into your project.
    const demoWindow = window !== undefined ? window() : undefined;

    return (
        <AppProvider
        branding={{
            logo: <RemoveRedEyeIcon/>,
            title: 'Sential',
          }}
            navigation={NAVIGATION}
            router={router}
            window={demoWindow}
        >
            <DashboardLayout>
                <DemoPageContent pathname={pathname} />
            </DashboardLayout>
        </AppProvider>
    );
}
