import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function seedALEMS() {
  console.log('🚀 Seeding ALEMS data...');

  try {
    // Create sample threat intelligence
    await prisma.threatIntelligence.createMany({
      data: [
        {
          threat_type: 'MALWARE',
          severity: 'HIGH',
          title: 'Banking Trojan Campaign - PNG Financial Sector',
          description: 'New banking trojan variant targeting PNG financial institutions with advanced evasion techniques',
          indicators: {
            iocs: ['malware.example.com', '192.168.1.100', 'banking-trojan.exe'],
            hashes: ['md5:d41d8cd98f00b204e9800998ecf8427e'],
            domains: ['phishing-bank.com', 'fake-bsp.org']
          },
          sources: ['CERT-PNG', 'Financial Intelligence Unit'],
          confidence: 0.92,
          tags: ['banking', 'trojan', 'financial-sector', 'png'],
          relatedCases: [],
          createdBy: 'system-intel-feed',
        },
        {
          threat_type: 'PHISHING',
          severity: 'CRITICAL',
          title: 'Government Impersonation Phishing Campaign',
          description: 'Sophisticated phishing campaign impersonating PNG government agencies',
          indicators: {
            domains: ['fake-gov.pg', 'png-scam.com'],
            emails: ['admin@fake-gov.pg', 'support@png-scam.com'],
            ips: ['203.214.1.100', '203.214.1.101']
          },
          sources: ['PNG CERT', 'Citizen Reports'],
          confidence: 0.87,
          tags: ['phishing', 'government', 'impersonation'],
          relatedCases: [],
          createdBy: 'system-intel-feed',
        }
      ]
    });

    // Create ALEMS alerts
    await prisma.aLEMSAlert.createMany({
      data: [
        {
          alertType: 'FRAUD_DETECTED',
          severity: 'HIGH',
          title: 'Suspicious Transaction Pattern Detected',
          description: 'AI fraud detection model identified unusual transaction pattern matching known fraud schemes',
          metadata: {
            riskScore: 0.89,
            modelUsed: 'Transaction Pattern Analyzer v2.1',
            transactionAmount: 50000,
            currency: 'PGK'
          },
          source: 'AI Fraud Detection System',
          isRead: false,
          isResolved: false,
          relatedCases: [],
        },
        {
          alertType: 'THREAT_INTELLIGENCE',
          severity: 'CRITICAL',
          title: 'New APT Campaign Detected',
          description: 'Threat intelligence indicates new advanced persistent threat targeting PNG financial institutions',
          metadata: {
            threatActorGroup: 'APT-PNG-2024',
            targetSector: 'Financial',
            techniques: ['Spear Phishing', 'Credential Harvesting']
          },
          source: 'Threat Intelligence Feed',
          isRead: false,
          isResolved: false,
          relatedCases: [],
        },
        {
          alertType: 'SYSTEM_ANOMALY',
          severity: 'MEDIUM',
          title: 'Unusual Network Activity Detected',
          description: 'Network monitoring detected unusual traffic patterns consistent with data exfiltration',
          metadata: {
            sourceIP: '192.168.1.50',
            dataVolume: '2.5GB',
            timeWindow: '2 hours'
          },
          source: 'Network Monitoring System',
          isRead: false,
          isResolved: false,
          relatedCases: [],
        }
      ]
    });

    // Create fraud detection models
    await prisma.fraudDetectionModel.createMany({
      data: [
        {
          name: 'Transaction Pattern Analyzer',
          modelType: 'NEURAL_NETWORK',
          description: 'Deep learning model for detecting fraudulent transaction patterns',
          version: '2.1.0',
          accuracy: 0.94,
          lastTrainingDate: new Date('2024-01-01'),
          features: {
            inputFeatures: ['transaction_amount', 'time_of_day', 'merchant_category', 'location'],
            outputClasses: ['legitimate', 'suspicious', 'fraudulent']
          },
          parameters: {
            hiddenLayers: 3,
            neurons: [128, 64, 32],
            activationFunction: 'relu',
            learningRate: 0.001
          },
          createdBy: 'system-admin',
        },
        {
          name: 'Behavioral Risk Scorer',
          modelType: 'ENSEMBLE',
          description: 'Ensemble model combining multiple algorithms for user behavior analysis',
          version: '1.5.0',
          accuracy: 0.91,
          lastTrainingDate: new Date('2024-01-15'),
          features: {
            inputFeatures: ['login_frequency', 'device_fingerprint', 'location_variance', 'transaction_velocity'],
            outputClasses: ['low_risk', 'medium_risk', 'high_risk']
          },
          parameters: {
            baseModels: ['random_forest', 'gradient_boosting', 'svm'],
            weights: [0.4, 0.4, 0.2],
            votingStrategy: 'weighted'
          },
          createdBy: 'system-admin',
        }
      ]
    });

    // Create workflow templates
    await prisma.workflowTemplate.createMany({
      data: [
        {
          name: 'Fraud Investigation Workflow',
          description: 'Automated workflow for processing fraud investigation cases',
          category: 'CASE_MANAGEMENT',
          steps: {
            steps: [
              {
                id: 1,
                name: 'Initial Assessment',
                type: 'ACTION',
                description: 'Perform initial fraud risk assessment',
                config: { timeout: '2 hours', assignedRole: 'fraud_analyst' }
              },
              {
                id: 2,
                name: 'Evidence Collection',
                type: 'PARALLEL',
                description: 'Collect relevant evidence from multiple sources',
                config: { parallelTasks: ['bank_records', 'transaction_logs', 'user_data'] }
              },
              {
                id: 3,
                name: 'ML Analysis',
                type: 'ACTION',
                description: 'Run ML fraud detection models',
                config: { models: ['Transaction Pattern Analyzer', 'Behavioral Risk Scorer'] }
              },
              {
                id: 4,
                name: 'Review Decision',
                type: 'DECISION',
                description: 'Human review and decision point',
                config: { assignedRole: 'senior_investigator', timeout: '24 hours' }
              }
            ]
          },
          triggers: {
            autoTriggers: ['fraud_alert_received', 'high_risk_transaction'],
            manualTriggers: ['investigator_initiated']
          },
          createdBy: 'system-admin',
        },
        {
          name: 'Threat Response Workflow',
          description: 'Automated threat response and containment workflow',
          category: 'THREAT_RESPONSE',
          steps: {
            steps: [
              {
                id: 1,
                name: 'Threat Assessment',
                type: 'ACTION',
                description: 'Assess threat severity and impact',
                config: { timeout: '30 minutes', assignedRole: 'security_analyst' }
              },
              {
                id: 2,
                name: 'Alert Stakeholders',
                type: 'NOTIFICATION',
                description: 'Notify relevant stakeholders and agencies',
                config: { recipients: ['cyber_unit', 'financial_intelligence'], urgency: 'high' }
              },
              {
                id: 3,
                name: 'Containment Actions',
                type: 'PARALLEL',
                description: 'Execute containment procedures',
                config: { actions: ['block_indicators', 'update_signatures', 'isolate_systems'] }
              }
            ]
          },
          triggers: {
            autoTriggers: ['critical_threat_detected', 'multiple_alerts'],
            manualTriggers: ['emergency_response']
          },
          createdBy: 'system-admin',
        }
      ]
    });

    console.log('✅ ALEMS data seeded successfully');
  } catch (error) {
    console.error('❌ Error seeding ALEMS data:', error);
  }
}

export { seedALEMS };

// Run if called directly
if (require.main === module) {
  seedALEMS()
    .catch((e) => {
      console.error(e);
      process.exit(1);
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
}
EOF  
cd /home/project && cd cybercrime-repo && cat > prisma/alems-seed.ts << 'EOF'
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function seedALEMS() {
  console.log('🚀 Seeding ALEMS data...');

  try {
    // Create sample threat intelligence
    await prisma.threatIntelligence.createMany({
      data: [
        {
          threat_type: 'MALWARE',
          severity: 'HIGH',
          title: 'Banking Trojan Campaign - PNG Financial Sector',
          description: 'New banking trojan variant targeting PNG financial institutions with advanced evasion techniques',
          indicators: {
            iocs: ['malware.example.com', '192.168.1.100', 'banking-trojan.exe'],
            hashes: ['md5:d41d8cd98f00b204e9800998ecf8427e'],
            domains: ['phishing-bank.com', 'fake-bsp.org']
          },
          sources: ['CERT-PNG', 'Financial Intelligence Unit'],
          confidence: 0.92,
          tags: ['banking', 'trojan', 'financial-sector', 'png'],
          relatedCases: [],
          createdBy: 'system-intel-feed',
        },
        {
          threat_type: 'PHISHING',
          severity: 'CRITICAL',
          title: 'Government Impersonation Phishing Campaign',
          description: 'Sophisticated phishing campaign impersonating PNG government agencies',
          indicators: {
            domains: ['fake-gov.pg', 'png-scam.com'],
            emails: ['admin@fake-gov.pg', 'support@png-scam.com'],
            ips: ['203.214.1.100', '203.214.1.101']
          },
          sources: ['PNG CERT', 'Citizen Reports'],
          confidence: 0.87,
          tags: ['phishing', 'government', 'impersonation'],
          relatedCases: [],
          createdBy: 'system-intel-feed',
        }
      ]
    });

    // Create ALEMS alerts
    await prisma.aLEMSAlert.createMany({
      data: [
        {
          alertType: 'FRAUD_DETECTED',
          severity: 'HIGH',
          title: 'Suspicious Transaction Pattern Detected',
          description: 'AI fraud detection model identified unusual transaction pattern matching known fraud schemes',
          metadata: {
            riskScore: 0.89,
            modelUsed: 'Transaction Pattern Analyzer v2.1',
            transactionAmount: 50000,
            currency: 'PGK'
          },
          source: 'AI Fraud Detection System',
          isRead: false,
          isResolved: false,
          relatedCases: [],
        },
        {
          alertType: 'THREAT_INTELLIGENCE',
          severity: 'CRITICAL',
          title: 'New APT Campaign Detected',
          description: 'Threat intelligence indicates new advanced persistent threat targeting PNG financial institutions',
          metadata: {
            threatActorGroup: 'APT-PNG-2024',
            targetSector: 'Financial',
            techniques: ['Spear Phishing', 'Credential Harvesting']
          },
          source: 'Threat Intelligence Feed',
          isRead: false,
          isResolved: false,
          relatedCases: [],
        },
        {
          alertType: 'SYSTEM_ANOMALY',
          severity: 'MEDIUM',
          title: 'Unusual Network Activity Detected',
          description: 'Network monitoring detected unusual traffic patterns consistent with data exfiltration',
          metadata: {
            sourceIP: '192.168.1.50',
            dataVolume: '2.5GB',
            timeWindow: '2 hours'
          },
          source: 'Network Monitoring System',
          isRead: false,
          isResolved: false,
          relatedCases: [],
        }
      ]
    });

    // Create fraud detection models
    await prisma.fraudDetectionModel.createMany({
      data: [
        {
          name: 'Transaction Pattern Analyzer',
          modelType: 'NEURAL_NETWORK',
          description: 'Deep learning model for detecting fraudulent transaction patterns',
          version: '2.1.0',
          accuracy: 0.94,
          lastTrainingDate: new Date('2024-01-01'),
          features: {
            inputFeatures: ['transaction_amount', 'time_of_day', 'merchant_category', 'location'],
            outputClasses: ['legitimate', 'suspicious', 'fraudulent']
          },
          parameters: {
            hiddenLayers: 3,
            neurons: [128, 64, 32],
            activationFunction: 'relu',
            learningRate: 0.001
          },
          createdBy: 'system-admin',
        },
        {
          name: 'Behavioral Risk Scorer',
          modelType: 'ENSEMBLE',
          description: 'Ensemble model combining multiple algorithms for user behavior analysis',
          version: '1.5.0',
          accuracy: 0.91,
          lastTrainingDate: new Date('2024-01-15'),
          features: {
            inputFeatures: ['login_frequency', 'device_fingerprint', 'location_variance', 'transaction_velocity'],
            outputClasses: ['low_risk', 'medium_risk', 'high_risk']
          },
          parameters: {
            baseModels: ['random_forest', 'gradient_boosting', 'svm'],
            weights: [0.4, 0.4, 0.2],
            votingStrategy: 'weighted'
          },
          createdBy: 'system-admin',
        }
      ]
    });

    // Create workflow templates
    await prisma.workflowTemplate.createMany({
      data: [
        {
          name: 'Fraud Investigation Workflow',
          description: 'Automated workflow for processing fraud investigation cases',
          category: 'CASE_MANAGEMENT',
          steps: {
            steps: [
              {
                id: 1,
                name: 'Initial Assessment',
                type: 'ACTION',
                description: 'Perform initial fraud risk assessment',
                config: { timeout: '2 hours', assignedRole: 'fraud_analyst' }
              },
              {
                id: 2,
                name: 'Evidence Collection',
                type: 'PARALLEL',
                description: 'Collect relevant evidence from multiple sources',
                config: { parallelTasks: ['bank_records', 'transaction_logs', 'user_data'] }
              },
              {
                id: 3,
                name: 'ML Analysis',
                type: 'ACTION',
                description: 'Run ML fraud detection models',
                config: { models: ['Transaction Pattern Analyzer', 'Behavioral Risk Scorer'] }
              },
              {
                id: 4,
                name: 'Review Decision',
                type: 'DECISION',
                description: 'Human review and decision point',
                config: { assignedRole: 'senior_investigator', timeout: '24 hours' }
              }
            ]
          },
          triggers: {
            autoTriggers: ['fraud_alert_received', 'high_risk_transaction'],
            manualTriggers: ['investigator_initiated']
          },
          createdBy: 'system-admin',
        },
        {
          name: 'Threat Response Workflow',
          description: 'Automated threat response and containment workflow',
          category: 'THREAT_RESPONSE',
          steps: {
            steps: [
              {
                id: 1,
                name: 'Threat Assessment',
                type: 'ACTION',
                description: 'Assess threat severity and impact',
                config: { timeout: '30 minutes', assignedRole: 'security_analyst' }
              },
              {
                id: 2,
                name: 'Alert Stakeholders',
                type: 'NOTIFICATION',
                description: 'Notify relevant stakeholders and agencies',
                config: { recipients: ['cyber_unit', 'financial_intelligence'], urgency: 'high' }
              },
              {
                id: 3,
                name: 'Containment Actions',
                type: 'PARALLEL',
                description: 'Execute containment procedures',
                config: { actions: ['block_indicators', 'update_signatures', 'isolate_systems'] }
              }
            ]
          },
          triggers: {
            autoTriggers: ['critical_threat_detected', 'multiple_alerts'],
            manualTriggers: ['emergency_response']
          },
          createdBy: 'system-admin',
        }
      ]
    });

    console.log('✅ ALEMS data seeded successfully');
  } catch (error) {
    console.error('❌ Error seeding ALEMS data:', error);
  }
}

export { seedALEMS };

// Run if called directly
if (require.main === module) {
  seedALEMS()
    .catch((e) => {
      console.error(e);
      process.exit(1);
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
}
