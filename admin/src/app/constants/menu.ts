export interface MenuItem{
    icon?:string;
    label?:string;
    to:string
    roles?: [];
}
const data: MenuItem[] = [
    {
        icon: 'glyph-icon iconsminds-dashboard',
        label: 'Dashboard',
        to: '/dashboard',
        roles: []
    },
    {
        icon: 'glyph-icon simple-icon-user',
        label: 'Miembros',
        to: '/dashboard/members',
        roles: []
    },
    {
        icon: 'glyph-icon simple-icon-people',
        label: 'Registros',
        to: '/dashboard/records',
        roles: []
    },
    {
        icon: 'glyph-icon iconsminds-data-center',
        label: 'Transacciones',
        to: '/dashboard/transactions',
        roles: []
    },
    {
        icon: 'glyph-icon iconsminds-credit-card',
        label: 'Créditos',
        to: '/dashboard/credits',
        roles: []
    },
    {
        icon: 'glyph-icon simple-icon-docs',
        label: 'Incidencias',
        to: '/dashboard/reports',
        roles: []
    }
];
export default data;