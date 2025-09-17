import React from "react";

const MoneyBackGuaranteePolicy = () => {
  return (
    <section id="money-back-policy" className="py-16 bg-white scroll-mt-20">
      <div className="container mx-auto px-4 max-w-3xl">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Money-Back Guarantee Policy
        </h2>
        <p className="text-gray-700 mb-4">
          At Print Palash, we are committed to delivering high-quality printing
          products that meet your expectations. If you are not satisfied with
          your order due to a mistake on our part, we will gladly offer a refund
          or reprint.
        </p>
        <p className="text-gray-700 mb-4">
          However, to maintain fairness and prevent misuse of this policy, the
          following terms apply:
        </p>

        <h3 className="font-semibold text-gray-900 mt-6 mb-2">
          Eligibility for Refund or Reprint
        </h3>
        <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
          <li>
            <strong>Valid Reason – </strong> Refunds or reprints will only be
            granted for:
            <ul className="list-disc list-inside ml-5 mt-1 space-y-1">
              <li>
                Printing errors made by our team (e.g., wrong colors, incorrect
                sizes, spelling errors not in approved proof).
              </li>
              <li>Damage to products during production or delivery.</li>
              <li>
                Items that differ significantly from the approved proof/design.
              </li>
            </ul>
          </li>
          <li>
            <strong>Proof Approval Responsibility –</strong> Clients must review
            and approve proofs before printing. Errors in approved proofs are
            not refundable.
          </li>
          <li>
            <strong>Evidence Required –</strong> Customers must provide
            photographic or video evidence of the issue within 48 hours of
            receiving their order.
          </li>
          <li>
            <strong>Return of Product –</strong> In some cases, the defective
            order must be returned before a refund/reprint is processed. We’ll
            provide return instructions.
          </li>
        </ul>

        <h3 className="font-semibold text-gray-900 mt-6 mb-2">Exclusions</h3>
        <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
          <li>Change of mind after printing has begun.</li>
          <li>
            Dissatisfaction with colors/materials shown in proofs or product
            descriptions.
          </li>
          <li>
            Products damaged after delivery due to mishandling or storage.
          </li>
          <li>Claims made more than 7 days after delivery.</li>
        </ul>

        <h3 className="font-semibold text-gray-900 mt-6 mb-2">
          Refund/Resolution Process
        </h3>
        <p className="text-gray-700 mb-4">Once your claim is verified:</p>
        <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
          <li>
            We will reprint your order at no additional cost OR issue a
            full/partial refund (excluding delivery fees).
          </li>
          <li>Refunds are processed within 7–10 business days.</li>
        </ul>

        <h3 className="font-semibold text-gray-900 mt-6 mb-2">
          Our Commitment
        </h3>
        <p className="text-gray-700">
          We believe in fairness — our money-back guarantee exists to protect
          you in the rare event of an error, while ensuring the policy is not
          exploited.
        </p>
      </div>
    </section>
  );
};

export default MoneyBackGuaranteePolicy;
