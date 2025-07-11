interface project_config {
    framework: Framework
}

enum Framework {
    vanilla,
    react
}

const project_config = {
    framework: Framework.vanilla
}

export {
    project_config,
    Framework
};