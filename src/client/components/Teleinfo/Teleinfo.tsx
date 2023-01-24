import { FunctionComponent } from 'react';
import { withNotifications } from '../../hoc/with-notifications';
import { TeleInfo } from '../../../shared/domain/teleinfo';

import './Teleinfo.scss';

export interface WithNotificationDataProps {
  currencySymbol: string;
  data_TELEINFO?: TeleInfo;
}

const PERIOD_LABELS_PER_FARE_OPTION: {
  [key: string]: string[];
} = {
  BASE: ['base'],
  EJP: ['EJP:normal', 'EJP:peak'],
  HC: ['HC:low', 'HC:high'],
}

const Teleinfo: FunctionComponent<WithNotificationDataProps> = (
  props: WithNotificationDataProps
) => {
  const { currencySymbol, data_TELEINFO } = props;

  function computeWholeSuppliedPower(categoryKey: string) {
    const {data_TELEINFO} = props;
    if (!data_TELEINFO || !data_TELEINFO.suppliedPower) {
      return undefined;
    }

    const suppliedPowers = data_TELEINFO.suppliedPower[categoryKey] as number[];
    return suppliedPowers.reduce((sum, current) => {
      return sum + current;
    }, 0);
  }

  function getPeriodLabel(rank: number) {
    const {data_TELEINFO} = props;

    if (!data_TELEINFO?.chosenFareOption) {
      return undefined;
    }
    return PERIOD_LABELS_PER_FARE_OPTION[data_TELEINFO.chosenFareOption][rank] || undefined;
  }

  function renderSuppliedDetails() {
    const {data_TELEINFO} = props;

    if (!data_TELEINFO) {
      return undefined;
    }

    return (
      <ul className="teleinfo__supplied-detail-items">
        {data_TELEINFO.suppliedPower?.currentDay?.map((pw, rank) => {
          const periodLabel = getPeriodLabel(rank) || '';
          return (
            <li className="teleinfo__supplied-detail-item" key={`supplied-option-${rank}`}>
              <span className="teleinfo__supplied-label">{periodLabel}:</span>
              <span className="teleinfo__supplied-value">
                {pw || '...'}
              </span>
              /
              <span className="teleinfo__supplied-value">
                {data_TELEINFO.suppliedPower?.total && data_TELEINFO.suppliedPower?.total[rank] || '...'}
              </span>
              <span className="teleinfo__supplied-unit">wh</span> 
            </li>);
        })}
      </ul>);
  }

  // TODO debug log with integrated logger
  console.log({ data_TELEINFO });

  const wholeSuppliedPowerForDay = computeWholeSuppliedPower('currentDay');
  const wholeSuppliedPowerTotal = computeWholeSuppliedPower('total');

  return (
    <div className="teleinfo">
      {!data_TELEINFO && (
        <p className="teleinfo__no-data">
          No data received yet.
        </p>
      )}
      {!!data_TELEINFO && (
        <>
          <section className="teleinfo__instant-section">
            <p className="teleinfo__power">
              <span className="teleinfo__power-label">Instant power:</span>
              <span className="teleinfo__power-value">{data_TELEINFO.apparentPower}</span>
              <span className="teleinfo__power-unit">VA</span>
              - 
              <span className="teleinfo__power-value">{data_TELEINFO.estimatedPower}</span>
              <span className="teleinfo__power-unit">W(est.)</span> 
            </p>
            <p className="teleinfo__intensity">
              <span className="teleinfo__intensity-label">Instant intensity:</span>
              <span className="teleinfo__intensity-value">{data_TELEINFO.instantIntensity}</span>
              <span className="teleinfo__intensity-unit">A</span> 
            </p>
            <p className="teleinfo__supplied">
              <span className="teleinfo__supplied-label">Supplied (today/total):</span>
              <span className="teleinfo__supplied-value">
                {wholeSuppliedPowerForDay || '...'}
              </span>
              /
              <span className="teleinfo__supplied-value">
                {wholeSuppliedPowerTotal || '...'}
              </span>
              <span className="teleinfo__supplied-unit">wh</span> 
            </p>
            <p className="teleinfo__supplied-detail">
              {renderSuppliedDetails()}              
            </p>
          </section>
          <section className="teleinfo__costs-section">
            <p className="teleinfo__costs">
              <span className="teleinfo__costs-label">Costs (today/total):</span>
              <span className="teleinfo__costs-value">
                {data_TELEINFO.estimatedPrices?.currentDay || '...'}
              </span>
              /
              <span className="teleinfo__costs-value">
                {data_TELEINFO.estimatedPrices?.total || '...'}
              </span>
              <span className="teleinfo__costs-unit">{currencySymbol}(est.)</span> 
            </p>
          </section>
        </>
      )}
    </div>
  );
};

export default withNotifications(Teleinfo, ['TELEINFO']);
