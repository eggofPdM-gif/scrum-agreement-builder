export const templates = {
    scrum: {
        label: "Scrum",
        description: "Structured iterations with defined roles and ceremonies.",
        defaults: {
            sprintDuration: "2 Weeks",
            planningDay: "Monday",
            standupTime: "10:00",
            codereview: "1 Approval Required",
            estimation: "Story Points (Fibonacci)"
        }
    },
    kanban: {
        label: "Kanban",
        description: "Continuous flow with focus on limiting work in progress.",
        defaults: {
            sprintDuration: "Kanban (No Sprints)",
            planningDay: null,
            standupTime: "11:00",
            codereview: "1 Approval Required",
            estimation: "No Estimation"
        }
    },
    custom: {
        label: "Custom",
        description: "Start from scratch and define your own rules.",
        defaults: {}
    }
};
