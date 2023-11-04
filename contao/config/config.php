<?php

// Add SCSS sources
$GLOBALS['TC_SOURCES']['configFiles'][] = 'bundles/contaothememanagereffects/framework/scss/_config.scss';
$GLOBALS['TC_SOURCES']['files'][]       = 'bundles/contaothememanagereffects/framework/scss/_effects.scss';

$GLOBALS['CTM_HOOKS']['onCreateCustomXmlConfig'][] = ['ContaoThemeManager\Effects\Generator\EffectsConfigGenerator', 'generateOptions'];
