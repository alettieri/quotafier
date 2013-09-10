App.Project.FIXTURES = [

    {
        id: 40,
        title: "New Rivers Website",
        description: "New Rivers website project, it's a restaurant",
        details: [50,60]
    }
];

App.Detail.FIXTURES = [
    {
        id: 50,
        title: 'Intitial Client Communication',
        description: 'info gathering form to client, review of it, possible call',
        project: 40,
        detailItems: [40,50]
    },
    {
        id: 60,
        title: 'Putting Together Estimate',
        description: 'Sarah & Antonio discuss, formatting, etc',
        project: 40,
        detailItems: [60,70]
    }
];

App.DetailItem.FIXTURES = [
    {
        id: 40,
        title: 'Gather Information from Client',
        notes: '',
        hours: 1,
        detail: 50
    },
    {
        id: 50,
        title: 'Review Information, Calls',
        notes: '',
        hours: 1,
        detail: 50
    },
    {
        id: 60,
        title: 'Develope Front End',
        notes: '',
        hours: 10,
        detail: 60
    },
    {
        id: 70,
        title: 'Discuss notes with Antonio',
        notes: '',
        hours: 0,
        detail: 60
    }
];

