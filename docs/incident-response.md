# Incident response template

Status: template. This project still needs a real responsible owner, security contact and hosting environment before public production launch.

## Severity triggers

- Website defacement or malicious script injection.
- Incorrect, harmful or outdated health content that could change urgent user behavior.
- Compromised GitHub workflow, dependency or deployment token.
- Privacy incident involving accidental collection, exposure or logging of sensitive data.
- Broken security controls such as missing CSP, unsafe links or injected third-party scripts.

## Immediate actions

1. Preserve evidence: URL, timestamp, affected commit, deployment run and screenshots where safe.
2. Stop further exposure: disable deployment, revert to last known good commit or remove the affected page.
3. Confirm whether users may have seen harmful health guidance or malicious content.
4. Assign incident lead, communications owner and technical owner.
5. Document decisions in a private incident log.

## Scenario: defacement

- Revert or roll back the static deployment.
- Rotate deployment credentials and review repository access.
- Check workflow logs and recent commits.
- Publish a short correction if users may have seen misleading content.

## Scenario: harmful health content

- Remove or hide the affected content immediately.
- Replace with a conservative safety notice pointing to official sources and urgent help.
- Request qualified medical review before restoring the content.
- Record source, reviewer and correction date.

## Scenario: compromised GitHub workflow

- Disable the workflow.
- Revoke affected tokens and review repository secrets.
- Pin or rotate actions and dependencies.
- Rebuild from a reviewed clean commit.

## Scenario: privacy incident

- Identify whether any personal, health or contact data was collected or exposed.
- Remove the data from public surfaces.
- Preserve necessary evidence without copying sensitive data into public issues.
- Follow legal/privacy review before notifying users or authorities.

## Emergency rollback

Keep a known-good commit hash and deployment procedure in the private runbook. For static hosting, rollback should be a revert commit or redeploy of a reviewed artifact.
