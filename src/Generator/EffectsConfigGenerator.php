<?php

namespace ContaoThemeManager\Effects\Generator;

use ContaoThemeManager\Core\Generator\ConfigGenerator;
use ContaoThemeManager\Core\StyleManager\StyleManagerXML;

/**
 * Generates css and xml for effects
 *
 * @author Sebastian Zoglowek <https://github.com/zoglo>
 */
class EffectsConfigGenerator extends ConfigGenerator
{
    private array $delayContainers    = [''=>[], 'txt_'=>[], 'img_'=>[], 'ico_'=>[], 'lnk_'=>[], 'frm_'=>[]];
    private array $durationContainers = [''=>[], 'txt_'=>[], 'img_'=>[], 'ico_'=>[], 'lnk_'=>[], 'frm_'=>[]];

    /**
     * Gets all aspect ratios from the ThemeManager configuration and adds it to the style-manager-tm-config.xml
     */
    public function generateOptions(array $configVars, StyleManagerXML $xml): void
    {
        self::setEffectOptions(
            $this->delayContainers,
            $configVars,
            'fx-animation-delays',
            'anim-dly-',
            ' Sec',
            [0.05,0.1,0.15,0.2,0.25,0.3,0.35,0.4,0.5,0.75,1,1.5,2,3]
        );

        self::setEffectOptions(
            $this->durationContainers,
            $configVars,
            'fx-animation-durations',
            'anim-dtn-',
            ' Sec',
            [0.5,1,1.5,2,3]
        );

        $xml->addGroup('gHeadline')
            ->addChild('animationDelay',        $this->delayContainers[''])
            ->addChild('animationDuration',     $this->durationContainers['']);
        $xml->addGroup('gPagination')
            ->addChild('animationDelay',        $this->delayContainers[''])
            ->addChild('animationDuration',     $this->durationContainers['']);
        $xml->addGroup('gLayout')
            ->addChild('animationDelay',        $this->delayContainers[''])
            ->addChild('animationDuration',     $this->durationContainers['']);
        $xml->addGroup('cLayout')
            ->addChild('animationDelay',        $this->delayContainers[''])
            ->addChild('animationDuration',     $this->durationContainers[''])
            ->addChild('animationDelayForm',    $this->delayContainers['frm_'])
            ->addChild('animationDurationForm', $this->durationContainers['frm_']);
        $xml->addGroup('eGridList')
            ->addChild('animationDelayList',    $this->delayContainers[''])
            ->addChild('animationDurationList', $this->durationContainers['']);
        $xml->addGroup('eList')
            ->addChild('animationDelayList',    $this->delayContainers[''])
            ->addChild('animationDurationList', $this->durationContainers['']);
        $xml->addGroup('eText')
            ->addChild('animationDelayList',    $this->delayContainers['txt_'])
            ->addChild('animationDurationList', $this->durationContainers['txt_']);
        $xml->addGroup('eImage')
            ->addChild('animationDelayList',    $this->delayContainers['img_'])
            ->addChild('animationDurationList', $this->durationContainers['img_']);
        $xml->addGroup('eIcon')
            ->addChild('animationDelayList',    $this->delayContainers['ico_'])
            ->addChild('animationDurationList', $this->durationContainers['ico_']);
        $xml->addGroup('eLink')
            ->addChild('animationDelay',        $this->delayContainers[''])
            ->addChild('animationDuration',     $this->durationContainers[''])
            ->addChild('animationDelayList',    $this->delayContainers['lnk_'])
            ->addChild('animationDurationList', $this->durationContainers['lnk_']);
    }

    private function setEffectOptions(array &$containers, array $configVars, string $configKey, string $classPrefix = '', string $labelSuffix = '', array $defaults = []): void
    {
        // Fallback to default values
        if (null === ($configOptions = self::getThemeManagerConfigVar($configVars, $configKey)))
        {
            $configOptions = $defaults;
        }
        else
        {
            $configOptions = explode(',', $configOptions);
        }

        foreach ($configOptions as $option)
        {
            $k = $classPrefix . str_replace('.','-', $option);
            $v = $option . $labelSuffix;

            foreach ($containers as $name => &$container)
            {
                $container[] = ['key' =>$name.$k,'value'=>$v];
            }
        }
    }
}
