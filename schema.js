import { buildSubgraphSchema } from "@apollo/subgraph";
import logger from './utils/logger.util.js';
import { importDynamicModules } from './utils/importDynamicModules.util.js';

async function loadDynamicallyTypeDefinitions() {
    let loaded = [];

    try {
        const modules = await importDynamicModules('types', '.type.js');
        loaded = modules.map(module => module.typeDefinition);
    } catch (error) {
        console.error('Error loading type definitions:', error);
    }

    return loaded;
}

loadDynamicallyTypeDefinitions().then((typeDefinition) => {

    if (typeDefinition) {
        logger.info('Loaded type definitions:', typeDefinition);
    }

    const schema = buildSubgraphSchema({
        typeDefs: typeDefinition,
        resolvers: {},
    });

});


// TODO: this is really dirty, but it works for now.
// TODO: foundation probably have a nicer way to do this but I want to have more data in a single file.
// TODO: oh no foundation is not a thing anymore, so I guess this is the way to go.