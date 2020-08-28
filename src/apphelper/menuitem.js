const munuItem = [
    {
        label: 'แฟ้มข้อมูลหลัก',
        items: [
            { label: 'ข้อมูลบริษัท', command: () => { moveTo('expense') } },
            { label: 'ข้อมูลธนาคาร', command: () => { moveTo('bank') } },
            { label: 'ข้อมูลสาขาธนาคาร', command: () => { moveTo('expense') } },
            { label: 'ข้อมูลค่าใช้จ่าย', command: () => { moveTo('expense') } },
            { label: 'ข้อมูลผู้รับเช็ค', command: () => { moveTo('cheque') } },
            { label: 'ข้อมูลประเภทการออกเช็ค', command: () => { moveTo('expense') } },
        ]
    },
    {
        separator: true
    },
    {
        label: 'ข้อมูลเช็ค',
        icon: 'pi pi-list',
        command: () => { moveTo('expense') }
    },
    {
        separator: true
    },
    {
        label: 'วันที่ทำรายการ',
        icon: 'pi pi-calendar',
        command: () => { moveTo('expense') }
    },
    {
        label: 'วันที่สั่งจ่ายเช็ค',
        icon: 'pi pi-calendar-plus',
        command: () => { moveTo('expense') }
    },
    {
        label: 'เลขที่เช็ค',
        icon: 'pi pi-list',
        command: () => { moveTo('expense') }
    },
    {
        separator: true
    },
    {
        label: 'Log Out',
        icon: 'pi pi-power-off',
    }
];

export default munuItem